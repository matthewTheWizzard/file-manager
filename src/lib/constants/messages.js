export const helloMessage = (username) => {
    return `Welcome to the File Manager, ${username}!`
}

export const goodbyeMessage = (username) => {
    return `Thank you for using File Manager, ${username}, goodbye!`
}

export const dirMessage = (dir) => {
    return `You are currently in path_to_working_directory \x1b[1m ${dir}`
}

export const invalidInputMessage = (input) => {
    return `Command ${input} does not exist.`
}

export const notADirectoryMessage = (dir) => {
    return `${dir} is not a directory!`
}

export const notAFileMessage = (file) => {
    return `${file} is not a file!`
}

export const directoryDoesNotExistMessage = (dir) => {
    return `The directory ${dir} does not exist!`
}

export const fileAlreadyExistsMessage = (file) => {
    return `File ${file} already exists!`
}

export const fileDoesNotExistMessage = (file) => {
    return `File ${file} does not exist!`
}

export const INVALID_ARGUMENT = 'Invalid argument format'

export const NO_VALUE = 'No value provided'

export const ARG_DOESNT_EXIST = 'Argument doesn\'t exist'

export const FS_OPERATION_FAILED = 'FS Operation failed'