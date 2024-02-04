import { ZLIB_COMMANDS } from "../constants/index.js";
import PathService from '../path/index.js'
import { PrintService } from "../print/index.js";
import { pipeline }from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { FS_OPERATION_FAILED } from "../constants/messages.js";
import path from 'path';
import zlib from 'node:zlib';

export class ZlibService {
    #pathService = PathService;
    #printService = new PrintService

    async [ZLIB_COMMANDS.compress](source, destination){
        const sourcePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination);

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
        const sourcePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination);

        const gunzip = zlib.createBrotliDecompress();
    
        const readable = createReadStream(sourcePath);
        const wrirable = createWriteStream(destinationPath);

        pipeline(readable, gunzip, wrirable, (err) => {

          if (err) {
            this.#printService.error(FS_OPERATION_FAILED);
          }
        });
    };

}