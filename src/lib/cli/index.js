/**
 * Represents a CLI Service.
 */
class CLIService {
    #args = process.argv.slice(2);

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
}

export default new CLIService();