import { CRYPTO_COMMANDS } from "../constants/index.js";
import PathService from '../path/index.js'
import { createHash } from 'node:crypto';
import { PrintService } from "../print/index.js";
import { FS_OPERATION_FAILED, fileDoesNotExistMessage } from "../constants/messages.js";
import { VALID_HASH_COMMAND } from "./constants/messages.js";
import fs from "node:fs";
import path from 'path'

export class CryptoService {
    #pathService = PathService;
    #printService = new PrintService();

    async [CRYPTO_COMMANDS.hash](source) {
        if (!source) {
            this.#printService.error(FS_OPERATION_FAILED)
            this.#printService.infoError(VALID_HASH_COMMAND)
            return;
        }

        const pathname = path.resolve(this.#pathService.currentDirectory, source);

        const fileExists = fs.existsSync(pathname);

        if (!fileExists) {
            this.#printService.error(fileDoesNotExistMessage(pathname))
            return;
        }
        
        const hash = createHash('sha256');
        
        const readStream = fs.createReadStream(pathname);

        readStream.on('readable', () => {
          const data = readStream.read();

          if (data) {
            hash.update(data);
          }
        });

        const streamEnd = new Promise(resolve => {
          readStream.on('end', () => {
              this.#printService.info(`Hash: ${hash.digest('hex')}`);
              resolve();
          });
        });

        await streamEnd;

        readStream.on('error', (error) => {
            this.#printService.error(FS_OPERATION_FAILED);
        });
    };
}