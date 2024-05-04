const { BadRequestError } = require("../expressError");

/*
Helper function for patch requests in companies and users models.

The function allows for partial update of a Company or User object
in postgreSQL database by parsing the provided data in the object
and it returns an object that provides pieces of a SQL query.
*/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Extract the keys to be updated
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  /* Dynamically create the update portion of the SQL query converting
  ** javascript syntax to SQL syntax using jsToSql object
  */ 
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // Return object contains the SET and VALUES of the SQL query 
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
