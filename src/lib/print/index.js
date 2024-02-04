export class PrintService {
    printHelloMesage(username) {
        console.log(`Welcome to the File Manager, ${username}!`)
    }

    printGoodbyeMessage(username) {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    }

    printDirectoryMessage(dir) {
        console.log(`You are currently in path_to_working_directory ${dir}`)
    }
}