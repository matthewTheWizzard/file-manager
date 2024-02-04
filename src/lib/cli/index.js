import { USERNAME_ARG } from "../constants/index.js";
import { validateName } from "../validate/index.js";

/**
 * Represents a CLI Service.
 */
export class CLIService {
    #args = process.argv.slice(2);
    #username = '';

    constructor() {
        this.#username = validateName(this.getArgValue(USERNAME_ARG));
     }

    /**
     * Get the value of a command line argument by name.
     * @param {string} name - The name of the argument.
     * @returns {string|null} - The value of the argument, or null if not found.
     */
    getArgValue(name) {
        const argIndex = this.#args.indexOf(name);
        return argIndex !== -1 ? this.#args[argIndex + 1] : null;
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