import { ZLIB_COMMANDS } from "../constants/index.js";
import PathService from '../path/index.js'
import zlib from 'node:zlib';
import { pipeline }from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

export class ZlibService {
    #pathService = PathService;

    async [ZLIB_COMMANDS.compress](source, destination){
        const sourcePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination);

        const gzip = zlib.createBrotliCompress();
    
        const readable = createReadStream(sourcePath);
        const wrirable = createWriteStream(destinationPath);

        pipeline(readable, gzip, wrirable, (err) => {

          if (err) {
            console.error('An error occurred:', err);
            process.exitCode = 1;
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
            console.error('An error occurred:', err);
            process.exitCode = 1;
          }
        });
    };

}