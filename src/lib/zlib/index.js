import { VALID_COMPRESS_COMMAND, VALID_DECOMPRESS_COMMAND } from "./constants/messages.js";
import { FS_OPERATION_FAILED, pathDoesNotExistMessage } from "../constants/messages.js";
import { createReadStream, createWriteStream } from 'node:fs';
import { ZLIB_COMMANDS } from "../constants/index.js";
import { PrintService } from "../print/index.js";
import PathService from '../path/index.js'
import { pipeline }from 'node:stream';
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'path';

export class ZlibService {
    #pathService = PathService;
    #printService = new PrintService

    async [ZLIB_COMMANDS.compress](source, destination){
        if (!source || !destination) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_COMPRESS_COMMAND);

            return;
        }

        const defaultArchiveName = path.basename(source) + '.br';

        const extention = destination.endsWith(defaultArchiveName) ? '' : defaultArchiveName;

        const sourcePath = path.resolve(this.#pathService.currentDirectory, source);

        const sourceExists = fs.existsSync(sourcePath);
        if (!sourceExists) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(pathDoesNotExistMessage(sourcePath))
  
            return;
        }

        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination, extention);

        const gzip = zlib.createBrotliCompress();
    
        const readable = createReadStream(sourcePath);
        const wrirable = createWriteStream(destinationPath);

        pipeline(readable, gzip, wrirable, (err) => {

          if (err) {
            this.#printService.error(FS_OPERATION_FAILED);
          }
        });
    };


    async [ZLIB_COMMANDS.decompress](source, destination){
        if (!source || !destination) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_DECOMPRESS_COMMAND);

            return;
        }

        const validArchive = source.endsWith('.br');

        const extention = path.basename(source).replace('.br', '');

        if (!validArchive) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error('Invalid archive format');
            return;
        }

        const sourcePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination, extention);

        const destinationExists = fs.existsSync(path.dirname(destinationPath));

        const sourceExists = fs.existsSync(sourcePath);

        if (!sourceExists) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(pathDoesNotExistMessage(sourcePath))
            return;
        }

        if (!destinationExists) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(pathDoesNotExistMessage(destinationPath))
            return;
        }

        const gunzip = zlib.createBrotliDecompress();
    
        const readable = createReadStream(sourcePath);
        const wrirable = createWriteStream(destinationPath);

        pipeline(readable, gunzip, wrirable, (err) => {

          if (err) {
            console.log(err)
            this.#printService.error(FS_OPERATION_FAILED);
          }
        });
    };
}