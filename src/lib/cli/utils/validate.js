import { ARG_DOESNT_EXIST, INVALID_ARGUMENT, NO_VALUE } from "../../constants/messages.js";
import { VALID_ARGS, INPUT_REGEX } from "../constants/index.js";

export const validateArg = (arg) => {
    if (!arg) {
        return false;
    }

    const match = arg.match(INPUT_REGEX);

    if (!match) {
        console.log(INVALID_ARGUMENT);
        return false;
    }

    const [name, value] = arg.split('=');

    if (!value) {
        console.log(NO_VALUE);
        return false;
    }

    const argExist = VALID_ARGS.includes(name);

    if (!argExist) {
        console.log(ARG_DOESNT_EXIST);
        return false;
    }

    return true
};