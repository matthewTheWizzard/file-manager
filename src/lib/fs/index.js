import fs from 'fs'
import PathService from '../path/index.js'
import path from 'path'
import fsPromises from 'fs/promises'
import { FS_COMMANDS } from '../constants/index.js'

export class FSService {
    #pathService = PathService;

    async [FS_COMMANDS.cat](filename) {
        try {
            const filePath = path.resolve(this.#pathService.currentDirectory, filename);
            const isFile = fs.lstatSync(filePath).isFile();

            if (!isFile) {
                // TODO: сервис обработке ошибок. В данном случае консоль
                console.log(`${filename} is not a file!`);
                return
            }

            const readStream = fs.createReadStream(filePath);

            readStream.pipe(process.stdout);
        } catch (error) {

            // TODO: сервис обработке ошибок. В данном случае консоль
            console.error(`FS operation failed: ${error.message}`);
        }
    }

    async [FS_COMMANDS.add](filename) {
        const filePath = path.resolve(this.#pathService.currentDirectory, filename);

        try {
            await fsPromises.writeFile(filePath, '', { flag: 'ax' });
        } catch (error) {
            // TODO: сервис обработке ошибок. В данном случае консоль
            console.error(`FS operation failed`);
            console.log(`File ${filename} already exists!`);
        }
    }

    async [FS_COMMANDS.rn](sourcePath, newFilename) {
        const oldPath = path.resolve(this.#pathService.currentDirectory, sourcePath);
        const newPath = path.resolve(path.dirname(oldPath), newFilename);
        const fileExists = fs.existsSync(oldPath);

        if (!fileExists) {
            console.log(`File ${sourcePath} does not exist!`);
            return;
        }
    
        try {
            await fsPromises.rename(oldPath, newPath);
        } catch (error) {
            console.log('FS operation failed')
        }
    }

    async [FS_COMMANDS.cp](source, destination) {
        const sourceFilePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination, path.basename(source));

        const fileExists = fs.existsSync(sourceFilePath);

        if (!fileExists) {
            console.log(`File ${source} does not exist!`);
            return;
        }

        this[FS_COMMANDS.add](destinationPath);

        try {
            const readStream = fs.createReadStream(sourceFilePath);
            const writeStream = fs.createWriteStream(destinationPath);

            readStream.pipe(writeStream);
        } catch (error) {
            console.error('FS operation failed');
        }
    }

    async [FS_COMMANDS.rm](source) {
        const sourcePathname = path.resolve(this.#pathService.currentDirectory, source);

        const fileExists = fs.existsSync(sourcePathname);

        if (!fileExists) {
            console.log(`File ${source} does not exist!`);
            return;
        }

        try {
            await fs.promises.rm(sourcePathname);
        } catch (error) {
            console.error(`Error deleting file "${source}`);
        }
    }

    async [FS_COMMANDS.mv](source, destination) {
        await this[FS_COMMANDS.cp](source, destination);
        await this[FS_COMMANDS.rm](source);
    }
}