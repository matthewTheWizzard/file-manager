import os from 'os';
import { validateArg } from './utils/index.js';
import { METHODS } from './constants/index.js';
import { OS_COMMANDS } from '../constants/index.js';
import { PrintService } from '../print/index.js';
import { INVALID_ARGUMENT } from '../constants/messages.js';

export class OSService {
    
    #printService = new PrintService();

    [OS_COMMANDS.os](arg) {
        const isArgValid = validateArg(arg);

        if (!isArgValid) {
            this.#printService.error(INVALID_ARGUMENT);
            return;
        }

        const method = METHODS[arg];

        this[method]();
    }

    [METHODS['--EOL']]() {
        this.#printService.info(`End-Of-Line (EOL): ${os.EOL}`);
    }

    [METHODS['--cpus']]() {
        const cpus = os.cpus();
        const MHZ_TO_GHZ = (speed) => (speed / 1000).toFixed(2) + ' GHz';

        this.#printService.info(`\n Number of CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
            this.#printService.info(`CPU ${index + 1}:`);
            this.#printService.info(`Model: ${cpu.model}`);
            this.#printService.info(`Speed: ${MHZ_TO_GHZ(spu.speed)}`);
        });
    }

    [METHODS['--homedir']]() {
        this.#printService.info(`Home Directory: ${os.homedir()}`);
    }

    [METHODS['--username']]() {
        this.#printService.info(`Current System User Name: ${os.userInfo().username}`);
    }

    [METHODS['--architecture']]() {
        this.#printService.info(`Node.js Binary Architecture: ${process.arch}`);
    }
}