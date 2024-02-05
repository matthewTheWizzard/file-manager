import { CLIService } from '../lib/cli/index.js';
import {
    ZLIB_COMMANDS,
    PATH_COMMANDS,
    FS_COMMANDS, 
    OS_COMMANDS,
    CRYPTO_COMMANDS
} from "../lib/constants/index.js";
import { 
    dirMessage,
    helloMessage,
    goodbyeMessage,
    invalidInputMessage,
    VALID_COMMANDS_MESSAGE,
    EXIT_MESSAGE
} from '../lib/constants/messages.js';
import { FSService } from '../lib/fs/index.js';
import  PathService from '../lib/path/index.js'
import { OSService } from '../lib/os/index.js';
import { PrintService } from "../lib/print/index.js";
import { validateCommand } from "../lib/validate/index.js";
import readline from 'readline';
import { CryptoService } from '../lib/crypto/index.js';
import { ZlibService } from '../lib/zlib/index.js';

export class App {
    #pathService = PathService;
    #cliService = new CLIService();
    #printService = new PrintService();
    #fsService = new FSService();
    #osService = new OSService();
    #cryptoService = new CryptoService()
    #zlibService = new ZlibService();

    init() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        this.#printService.info(helloMessage(this.#cliService.username));
    }

    startApp() { 
        this.init();

        this.rl.prompt();

        this.rl.on('line', async (input) => {
            const exit = input.trim() === '.exit';

            if (exit) {
                this.rl.close();
                return;
            }

            await this.handleInput(input);
    
            this.#printService.dir(dirMessage(this.#pathService.currentDirectory));

            this.rl.prompt();

        }).on('close', () => {
            this.#printService.info(goodbyeMessage(this.#cliService.username));

        });
    }

    async handleInput(input) {
        const { command, args } = this.#cliService.getInputCommand(input);

        const isCommandValid = validateCommand(command);

        if (!isCommandValid) {
            this.#printService.error(invalidInputMessage(command));
            this.#printService.infoError(VALID_COMMANDS_MESSAGE)
            this.#printService.infoError(EXIT_MESSAGE)
            return;
        }
    
        await this.getService(command)[command](...args);
    }

    getService(command) {
        if (FS_COMMANDS[command]) {
            return this.#fsService;
        }
        if (PATH_COMMANDS[command]) {
            return this.#pathService;
        }
        if (OS_COMMANDS[command]) {
            return this.#osService;
        }
        if (CRYPTO_COMMANDS[command]) {
            return this.#cryptoService;
        }
        if (ZLIB_COMMANDS[command]) {
            return this.#zlibService;
        }
    }
}