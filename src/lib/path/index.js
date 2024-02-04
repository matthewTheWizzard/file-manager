import os from 'os';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { sortAlphabetically } from './utils/sort.js';

export class PathService {
    #currentDirectory = os.homedir();

    setDirectory(dir) {
        this.#currentDirectory = dir;
    }

    get currentDirectory() {
        return this.#currentDirectory;
    }

    up() {
        const upDirectory = path.dirname(this.#currentDirectory);

        if (upDirectory !== this.#currentDirectory) {
            this.#currentDirectory = upDirectory;
        }
    }

    cd(dir) {
        const newDirectory = path.resolve(this.#currentDirectory, dir);

        if (!fs.existsSync(newDirectory)) {
            // TODO: сервис обработке ошибок. В данном случае консоль
            console.log(`The directory ${dir} does not exist!`);
            return;
        }

        this.#currentDirectory = newDirectory;
    }

    async ls() {
        try {
            const content = await fsPromises.readdir(this.currentDirectory);

            const filePath = (filename) => fs.lstatSync(path.join(this.#currentDirectory, filename));

            const toTableView = (Name, Type) => ({ Name, Type }); 

            const files = content.filter((item) => filePath(item).isFile())
                .sort(sortAlphabetically)
                .map((name) => toTableView(name, 'file'));

            const directories = content.filter((item) => filePath(item).isDirectory())
                .sort(sortAlphabetically)
                .map((name) => toTableView(name, 'directory'));

            const sortedFiles = [...directories, ...files];

            console.table(sortedFiles)
        } catch (error) {
            console.error(`Error listing directory: ${error.message}`);
        }
    }
}
