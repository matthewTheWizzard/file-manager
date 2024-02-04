import { validateCommand, validateName } from "../lib/validate/index.js";
import readline from 'readline';
import path from "path";
import CLIService from '../lib/cli/index.js';
import os from "os";
import { COMMANDS } from "../lib/constants/index.js";

export class App {
    #username = '';
    #directory = os.homedir();

    constructor(username) {
        this.#username = validateName(username);
    }

    init() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        this.printHelloMesage(console.log);
    }

    startApp() { 
        this.init();

        this.rl.on('line', (input) => {
            this.rl.prompt();
            this.handleInput(input);

            this.printDirectoryMessage(console.log);
        }).on('close', () => {
            this.printGoodbyeMessage(console.log);
    
            process.exit(0);
        });
    }

    printHelloMesage(outputCallback) {
        return outputCallback(`Welcome to the File Manager, ${this.#username}!`)
    }

    printGoodbyeMessage(outputCallback) {
        return outputCallback(`Thank you for using File Manager, ${this.#username}, goodbye!`)
    }

    setDirectory(dir) {
        this.#directory = dir;
    }

    printDirectoryMessage(outputCallback) {
        return outputCallback(`You are currently in path_to_working_directory ${this.#directory}`);
    }

    handleInput(input) {
        const { command, args } = CLIService.getInputCommand(input);

        const isCommandValid = validateCommand(command);

        if (!isCommandValid) {
            console.log(`Invalid input: ${command}`);
            return;
         }

        console.log(command, command === COMMANDS.CD);
     }
}