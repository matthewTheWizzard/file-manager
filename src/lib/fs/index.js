import fs, { read } from 'fs'
import PathService from '../path/index.js'
import { PrintService } from '../print/index.js'
import path from 'path'
import fsPromises from 'fs/promises'
import { FS_COMMANDS } from '../constants/index.js'
import { 
    notAFileMessage, 
    FS_OPERATION_FAILED, 
    fileDoesNotExistMessage,
    pathDoesNotExistMessage
} from '../constants/messages.js'
import { VALID_ADD_COMMAND,
     VALID_CAT_COMMAND, 
     VALID_CP_COMMAND, 
     VALID_MV_COMMAND, 
     VALID_RM_COMMAND, 
     VALID_RN_COMMAND 
} from './constants/messages.js'

export class FSService {
    #pathService = PathService;
    #printService = new PrintService()

    async [FS_COMMANDS.cat](filename) {
        if (!filename) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_CAT_COMMAND)
            return;
        }

        try {
            const filePath = path.resolve(this.#pathService.currentDirectory, filename);

            const fileExists = fs.existsSync(filePath);

            if (!fileExists) {
                this.#printService.error(FS_OPERATION_FAILED);
                this.#printService.error(fileDoesNotExistMessage(filePath))
                return;
            }

            const isFile = fs.lstatSync(filePath).isFile();

            if (!isFile) {
                this.#printService.error(FS_OPERATION_FAILED);
                this.#printService.error(notAFileMessage(filename))
                return
            }

            const readStream = fs.createReadStream(filePath);

            readStream.pipe(process.stdout);
        
            const streamEnd = new Promise(resolve => {
                readStream.on('end', () => {
                    process.stdout.write('\n');
                    resolve();
                });
            });
    
            await streamEnd;
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.add](filename) {
        if (!filename) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_ADD_COMMAND);
            return;
        }

        const filePath = path.resolve(this.#pathService.currentDirectory, filename);

        try {
            await fsPromises.writeFile(filePath, '', { flag: 'ax' });
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.rn](sourcePath, newFilename) {
        if (!sourcePath || !newFilename) { 
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_RN_COMMAND);
            return;
        }

        const oldPath = path.resolve(this.#pathService.currentDirectory, sourcePath);
        const newPath = path.resolve(path.dirname(oldPath), newFilename);
        const fileExists = fs.existsSync(oldPath);

        if (!fileExists) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(fileDoesNotExistMessage(oldPath))
            return;
        }
    
        try {
            await fsPromises.rename(oldPath, newPath);
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.cp](source, destination) {
        if (!source || !destination) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_CP_COMMAND);
            return;
        }

        const sourceFilePath = path.resolve(this.#pathService.currentDirectory, source);
        const destinationPath = path.resolve(this.#pathService.currentDirectory, destination, path.basename(sourceFilePath));

        const fileExists = fs.existsSync(sourceFilePath);

        if (!fileExists) {
            this.#printService.error(fileDoesNotExistMessage(sourceFilePath))
            return;
        }

        const destinationExists = fs.existsSync(path.dirname(destinationPath));

        if (!destinationExists) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(pathDoesNotExistMessage(destinationPath))
            return;
        }

        await this[FS_COMMANDS.add](destinationPath);

        try {
            const readStream = fs.createReadStream(sourceFilePath);
            const writeStream = fs.createWriteStream(destinationPath);

            readStream.pipe(writeStream);

            readStream.on('error', (error) => {
                this.#printService.error(error);

                writeStream.end();
                
            });

            const streamEnd = new Promise(resolve => {
                readStream.on('end', () => {
                    resolve();
                });
            });
    
            await streamEnd;

        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }

        return true;
    }

    async [FS_COMMANDS.rm](source) {
        if (!source) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_RM_COMMAND)
            return;
        }

        const sourcePathname = path.resolve(this.#pathService.currentDirectory, source);

        const fileExists = fs.existsSync(sourcePathname);

        if (!fileExists) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.error(fileDoesNotExistMessage(sourcePathname))
            return;
        }

        try {
            await fs.promises.rm(sourcePathname);
        } catch (error) {
            this.#printService.error(FS_OPERATION_FAILED);
        }
    }

    async [FS_COMMANDS.mv](source, destination) {
        if (!source || !destination) {
            this.#printService.error(FS_OPERATION_FAILED);
            this.#printService.infoError(VALID_MV_COMMAND);
            return;
        }

        const sucsessCopy = await this[FS_COMMANDS.cp](source, destination);

        if(!sucsessCopy) {
            return;
        }

        await this[FS_COMMANDS.rm](source);
    }
}