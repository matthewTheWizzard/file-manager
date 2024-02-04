import { CRYPTO_COMMANDS } from "../constants/index.js";
import PathService from '../path/index.js'
import { createHash } from 'node:crypto';
import fs from "node:fs";
import path from 'path'

export class CryptoService {
    #pathService = PathService;

    async [CRYPTO_COMMANDS.hash](source) {
        const pathname = path.resolve(this.#pathService.currentDirectory, source);

        const fileExists = fs.existsSync(pathname);

        if (!fileExists) {
            console.log(`File does not exist: ${pathname}`);
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

        readStream.on('end', () => {
            console.log(hash.digest('hex'));

            readStream.close();
        });
    };
}