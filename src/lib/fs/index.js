import fs from 'fs'
import PathService from '../path/index.js'
import { PrintService } from '../print/index.js'
import path from 'path'
import fsPromises from 'fs/promises'
import { FS_COMMANDS } from '../constants/index.js'
import { 
    notAFileMessage, 
    FS_OPERATION_FAILED, 
    fileAlreadyExistsMessage,
    fileDoesNotExistMessage
} from '../constants/messages.js'

export class FSService {
    #pathService = PathService;
    #printService = new PrintService()

    async [FS_COMMANDS.cat](filename) {
        try {
            const filePath = path.resolve(this.#pathService.currentDirectory, filename);
            const isFile = fs.lstatSync(filePath).isFile();

            if (!isFile) {
                this.#printService.error(notAFileMessage(filename))
                return
            }

            const readStream = fs.createReadStream(filePath);

            readStream.pipe(process.stdout);

            readStream.on('end', () => {
                console.log('After reading the file, the stream has ended.')
            });
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.add](filename) {
        const filePath = path.resolve(this.#pathService.currentDirectory, filename);

        try {
            await fsPromises.writeFile(filePath, '', { flag: 'ax' });
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(fileAlreadyExistsMessage(filename))
        }
    }

    async [FS_COMMANDS.rn](sourcePath, newFilename) {
        const oldPath = path.resolve(this.#pathService.currentDirectory, sourcePath);
        const newPath = path.resolve(path.dirname(oldPath), newFilename);
        const fileExists = fs.existsSync(oldPath);

        if (!fileExists) {
            this.#printService.error(fileDoesNotExistMessage(filename))
            return;
        }
    
        try {
            await fsPromises.rename(oldPath, newPath);
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.cp](source, destination) {
        const sourceFilePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination, path.basename(source));

        const fileExists = fs.existsSync(sourceFilePath);

        if (!fileExists) {
            this.#printService.error(fileDoesNotExistMessage(filename))
            return;
        }

        this[FS_COMMANDS.add](destinationPath);

        try {
            const readStream = fs.createReadStream(sourceFilePath);
            const writeStream = fs.createWriteStream(destinationPath);

            readStream.pipe(writeStream);
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.rm](source) {
        const sourcePathname = path.resolve(this.#pathService.currentDirectory, source);

        const fileExists = fs.existsSync(sourcePathname);

        if (!fileExists) {
            this.#printService.error(fileDoesNotExistMessage(filename))
            return;
        }

        try {
            await fs.promises.rm(sourcePathname);
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.mv](source, destination) {
        await this[FS_COMMANDS.cp](source, destination);
        await this[FS_COMMANDS.rm](source);
    }
}