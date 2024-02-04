import { ARGS } from "./constants/index.js";
import { validateName } from "../validate/index.js";
import { validateArg } from "./utils/validate.js";


export class CLIService {
    #args = process.argv.slice(2);
    #username = '';

    constructor() {
        this.#username = validateName(this.getArgValue(ARGS.USERNAME));
     }

    /**
     * Get the value of a command line argument by name.
     * @param {string} name - The name of the argument.
     * @returns {string} - The value of the argument, or null if not found.
     */
    getArgValue(name) {
        const arg = this.#args.find(arg => arg.includes(name));

        const isArgValid = validateArg(arg);

        if (!isArgValid) {
            return null;
        }
            
        return arg.split('=')[1];
    }

    /**
     * Parse the input command and return the command and its arguments.
     * @param {string} input - The input command.
     * @returns {Object} - The parsed command and its arguments.
     */
    getInputCommand(input) {
        const [command, ...args] = input.split(' ');

        return {
            command,
            args
        }
    }

    get username() {
        return this.#username;
    }
}