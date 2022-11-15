import chalk from 'chalk';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

export function getConnectionConfig() {
  let connectionConfig = {
    user: '',
    password: '',
    host: '',
    port: '',
    schema: '',
    source: 'unknown',
    useSSL: 'false',
  };

  if (process.env.WEBSITE_HOSTNAME && process.env.WEBSITE_HOSTNAME.includes('azurewebsites')) {
    // Get config from Azure
    connectionConfig.source = 'AZURE';
    connectionConfig.user = process.env.AZURE_MYSQL_USER;
    connectionConfig.password = process.env.AZURE_MYSQL_PASSWORD;
    connectionConfig.host = process.env.AZURE_MYSQL_HOST;
    connectionConfig.port = process.env.AZURE_MYSQL_PORT;
    connectionConfig.schema = process.env.AZURE_MYSQL_DATABASE;
  } else {
    // Assume local config
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dotEnvResults = dotenv.config({ path: path.join(__dirname, '../../.env') });

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

    connectionConfig.source = 'ENV';
    connectionConfig.user = process.env.DB_USER;
    connectionConfig.password = process.env.DB_PASSWORD;
    connectionConfig.host = process.env.DB_HOST;
    connectionConfig.port = process.env.DB_PORT;
    connectionConfig.schema = process.env.DB_SCHEMA;
    connectionConfig.useSSL = process.env.DB_USE_SSL || connectionConfig.useSSL;
  }

  return connectionConfig;
}
