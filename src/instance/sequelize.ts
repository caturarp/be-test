import { Sequelize } from 'sequelize-typescript';
import {config as dotenv} from 'dotenv' 
// should be require
dotenv();
const host:string = process.env.HOST || 'localhost';
const password:string = process.env.DB_PASSWORD || 'root';
const username:string = process.env.DB_USERNAME || 'root';
const database:string = process.env.DB_NAME || 'sequelize';
const port:any = process.env.DB_PORT || 5432;

export const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   models: [__dirname + '/model'] // or [Player, Team],
  database: database,
  host: host,
  dialect: 'postgres',
  username: username,
  password: password,
  logging: false, // logger on sql query
  port: port,
  models: [__dirname + '/model'] // or [Player, Team],
})