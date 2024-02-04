import { App } from './src/app/index.js'
import CLIService from './src/lib/cli/index.js'
import { USERNAME_ARG } from './src/lib/constants/index.js';

const app = new App(CLIService.getArgValue(USERNAME_ARG));

app.startApp()