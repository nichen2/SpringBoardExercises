/** Common config for bookstore. */

require("dotenv").config();

const DB_NAME = (process.env.NODE_ENV === "test")
  ? "books_test"
  : "books";



module.exports = { DB_NAME };