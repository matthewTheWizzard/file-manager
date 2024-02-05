import { VALID_OS_ARGS } from '../constants/index.js'; 

export const validateArg = (arg) => Object.values(VALID_OS_ARGS).includes(arg);