import { VALID_COMMANDS } from "../constants/index.js";

export const validateName = (name) => name || 'Stranger';

export const validateCommand = (command) => VALID_COMMANDS.includes(command);