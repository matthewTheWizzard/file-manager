import { RED, GREEN, BLUE, RESET, BLUE_BG, CYAN_BG } from "./constants/colors.js"

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

    dir(message) {
        console.log(BLUE_BG + message + RESET)
    }

    infoError(message) {
        console.log(CYAN_BG + message + RESET)
    }
}