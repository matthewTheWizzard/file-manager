import os from 'os';
import { validateArg } from './utils/index.js';
import { METHODS } from './constants/index.js';
import { OS_COMMANDS } from '../constants/index.js';
import { PrintService } from '../print/index.js';
import { INVALID_ARGUMENT } from '../constants/messages.js';
import { CORRECT_OS_ARGS } from './constants/messages.js';

export class OSService {
    
    #printService = new PrintService();

    [OS_COMMANDS.os](arg) {
        const isArgValid = validateArg(arg);

        if (!isArgValid) {
            this.#printService.error(INVALID_ARGUMENT + " " + arg);
            this.#printService.infoError(CORRECT_OS_ARGS);
            return;
        }

        const method = METHODS[arg];

        this[method]();
    }

    [METHODS['--EOL']]() {
        this.#printService.success(`End-Of-Line (EOL): ${JSON.stringify(os.EOL)}`);
    }

    [METHODS['--cpus']]() {
        const cpus = os.cpus();
        const mhzToGhzTransformer = (speed) => (speed / 1000).toFixed(2) + ' GHz';

        this.#printService.success(`Number of CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
            this.#printService.success(`CPU ${index + 1}:`);
            this.#printService.success(`Model: ${cpu.model}`);
            this.#printService.success(`Speed: ${mhzToGhzTransformer(cpu.speed)}`);
        });
    }

    [METHODS['--homedir']]() {
        this.#printService.success(`Home Directory: ${os.homedir()}`);
    }

    [METHODS['--username']]() {
        this.#printService.success(`Current System User Name: ${os.userInfo().username}`);
    }

    [METHODS['--architecture']]() {
        this.#printService.success(`Node.js Binary Architecture: ${process.arch}`);
    }
}