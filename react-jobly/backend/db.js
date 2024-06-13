"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: "postgresql:///jobly"
  });
} else {
  db = new Client({
    connectionString: "postgresql:///jobly_test"
  });
}

db.connect();

module.exports = db;