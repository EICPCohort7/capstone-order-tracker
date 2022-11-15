/**
 * File for configuring local DB connection based on .env properties
 */
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Sequelize } from 'sequelize';
import { getConnectionConfig } from './app-config.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Object containing user environment
let { user, password, host, port, schema, useSSL } = getConnectionConfig();

let dbConnectionString = `mysql://${user}:${password}@${host}:${port}/${schema}`;
console.log(dbConnectionString);

let sequelizeConfig = {
  logging: (...msg) => console.log(chalk.gray(msg.slice(0, -1))),
  logQueryParameters: true,
  define: {
    timestamps: false,
    underscored: true,
  },
};

if (useSSL === 'true') {
  sequelizeConfig.dialect = 'mysql';
  sequelizeConfig.dialectOptions = {
    ssl: {
      rejectUnauthorized: true,
      ca: [fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem')],
    },
  };
}

export const dbConnection = new Sequelize(dbConnectionString, sequelizeConfig);

// Need to figure out how to send response to front-end based on failure
try {
  await dbConnection.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
