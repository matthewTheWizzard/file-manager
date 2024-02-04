import os from 'os';
import { validateArg } from './utils/index.js';
import { METHODS } from './constants/index.js';

export class OSService {

    os(arg) {
        const isArgValid = validateArg(arg);

        if (!isArgValid) {
            console.log(`Invalid argument: ${arg}`);
            return;
        }

        const method = METHODS[arg];

        this[method]();
    }

    [METHODS['--EOL']]() {
        console.log("\n**********\n")
        console.log(`End-Of-Line (EOL): ${os.EOL}`);
    }

    [METHODS['--cpus']]() {
        const cpus = os.cpus();
        console.log("\n**********\n")
        console.log(`\n Number of CPUs: ${cpus.length} \n`);

        console.log("\n**********\n")
        cpus.forEach((cpu, index) => {
            console.log(`CPU ${index + 1}:`);
            console.log(`Model: ${cpu.model}`);
            console.log(`Speed: (${(cpu.speed / 1000).toFixed(2)} GHz)`);
        });
        console.log("\n**********\n")
    }

    [METHODS['--homedir']]() {
        console.log("\n**********\n")
        console.log(`Home Directory: ${os.homedir()}`);
        console.log("\n**********\n")
    }

    [METHODS['--username']]() {
        console.log("\n**********\n")
        console.log(`Current System User Name: ${os.userInfo().username}`);
        console.log("\n**********\n")
    }

    [METHODS['--architecture']]() {
        console.log("\n**********\n")
        console.log(`Node.js Binary Architecture: ${process.arch}`);
        console.log("\n**********\n")
    }
}