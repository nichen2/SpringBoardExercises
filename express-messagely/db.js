/** Database connection for messagely. */

const { Client } = require("pg");
require('dotenv').config();

const { DB_NAME } = require("./config");

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: DB_NAME
});

client.connect();

module.exports = client;