/**
 * File for configuring local DB connection based on .env properties
 */
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import chalk from 'chalk';

let result = dotenv.config();

// Likely an issue finding .env file, executing from root dir??
if (result.error) {
  console.log('Issue loading .env file', result.error.message);
  console.log('Likely need to run program from same dir as .env');
  throw result.error; // Error thrown and not caught anywhere, program crash.
}

// Object containing user environment
let { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = process.env;

let dbConnectionString = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`;

// Sequelize connection config
export const dbConnection = new Sequelize(dbConnectionString, {
  logging: (...msg) => console.log(chalk.gray(msg)),
  logQueryParameters: true,
  define: {
    timestamps: false,
    underscored: true,
  },
});
