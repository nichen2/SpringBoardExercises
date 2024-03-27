/** Database config for database. */


const { Client } = require("pg");
const {DB_NAME} = require("./config");

let db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: DB_NAME
});

db.connect();


module.exports = db;
