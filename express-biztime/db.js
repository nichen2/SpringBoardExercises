/** Database setup for BizTime. */

const { Client } = require("pg");
require('dotenv').config();

let dbName;

if (process.env.NODE_ENV === "test") {
  dbName = 'biztime_test'
} else {
  dbName = 'biztime';
}

let db = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: dbName
});

db.connect();

module.exports = db;