import { RED, GREEN, BLUE, RESET } from "./constants/colors.js"

export class PrintService {
    error(message) {
        console.log(RED + message + RESET)
    }

    info(message) {
        console.log(GREEN + message + RESET)
    }

    success(message) {
        console.log(BLUE + message + RESET)
    }
}