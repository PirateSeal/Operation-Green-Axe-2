const db = require('../database');

async function insertIntoTableAndValidate(tableName, item, schema) {
  const result = schema.validate(item);

  if (result.error === null || result.error === undefined) {
    const rows = await db(tableName).insert(item, '*');
    return rows[0];
  }
  return Promise.reject(result.error);
}

module.exports = {
  insertIntoTableAndValidate,
};
