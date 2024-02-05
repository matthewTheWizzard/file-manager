import { VALID_COMMANDS } from "./index.js"

export const helloMessage = (username) => {
    return `Welcome to the File Manager, ${username}! \n`
}

export const goodbyeMessage = (username) => {
    return `Thank you for using File Manager, ${username}, goodbye!`
}

export const dirMessage = (dir) => {
    return `You are currently in path_to_working_directory \x1b[1m ${dir}`
}

export const invalidInputMessage = (input) => {
    return `Command ${input} does not exist. \n`
}

export const notADirectoryMessage = (dir) => {
    return `${dir} is not a directory! \n`
}

export const notAFileMessage = (file) => {
    return `${file} is not a file! \n`
}

export const directoryDoesNotExistMessage = (dir) => {
    return `The directory ${dir} does not exist! \n`
}

export const fileAlreadyExistsMessage = (file) => {
    return `File ${file} already exists! \n`
}

export const fileDoesNotExistMessage = (file) => {
    return `File ${file} does not exist! \n`
}

export const pathDoesNotExistMessage = (path) => {
    return `Path ${path} does not exist! \n`
}

export const INVALID_ARGUMENT = 'Invalid argument format'

export const NO_VALUE = 'No value provided'

export const ARG_DOESNT_EXIST = 'Argument doesn\'t exist'

export const FS_OPERATION_FAILED = 'FS Operation failed'

export const CHECK_DIRECTORIES = 'Check directories by typing "ls"'

export const VALID_COMMANDS_MESSAGE = `Valid commands are: ${VALID_COMMANDS.join(', ')}`

export const EXIT_MESSAGE = 'Type ".exit" or press ctrl + C (cmd + C on Mac) to leave the File Manager'