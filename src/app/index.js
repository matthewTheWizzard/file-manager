import { CLIService } from '../lib/cli/index.js';
import { ALL_COMMANDS, 
    COMPRESS_COMMANDS,
    PATH_COMMANDS,
    FS_COMMANDS, 
    OS_COMMANDS,
    CRYPTO_COMMANDS
} from "../lib/constants/index.js";
import { FSService } from '../lib/fs/index.js';
import  PathService from '../lib/path/index.js'
import { OSService } from '../lib/os/index.js';
import { PrintService } from "../lib/print/index.js";
import { validateCommand } from "../lib/validate/index.js";
import readline from 'readline';
import { CryptoService } from '../lib/crypto/index.js';

export class App {
    #pathService = PathService;
    #cliService = new CLIService();
    #printService = new PrintService();
    #fsService = new FSService();
    #osService = new OSService();
    #cryptoService = new CryptoService

    init() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        this.#printService.printHelloMesage(this.#cliService.username);
    }

    startApp() { 
        this.init();

        this.rl.on('line', (input) => {
            this.rl.prompt();
            this.handleInput(input);

            this.#printService.printDirectoryMessage(this.#pathService.currentDirectory);
        }).on('close', () => {
            this.#printService.printGoodbyeMessage(this.#cliService.username);
    
            process.exit(0);
        });
    }

    handleInput(input) {
        const { command, args } = this.#cliService.getInputCommand(input);

        const isCommandValid = validateCommand(command);

        if (!isCommandValid) {
            console.log(`Invalid input: ${command}`);
            return;
         }

        switch (command) {
            case PATH_COMMANDS[command]:
                this.#pathService[PATH_COMMANDS[command]](...args);
                break;
            case FS_COMMANDS[command]:
                this.#fsService[FS_COMMANDS[command]](...args);
                break;
            case OS_COMMANDS[command]:
                this.#osService[OS_COMMANDS[command]](...args);
                break;
            case CRYPTO_COMMANDS[command]:
                this.#cryptoService[CRYPTO_COMMANDS[command]](...args);
                break;
        }
     }
}