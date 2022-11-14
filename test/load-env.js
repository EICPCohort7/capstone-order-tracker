import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dotEnvResults = dotenv.config(path.join(__dirname, '../.env'));

if (dotEnvResults.error) {
  if (dotEnvResults.error.code === 'ENOENT') {
    console.error(
      chalk.red.bold(
        '***** ERROR: Please create a .env file with the appropriate information! *****'
      )
    );
  }
  throw dotEnvResults.error;
}
