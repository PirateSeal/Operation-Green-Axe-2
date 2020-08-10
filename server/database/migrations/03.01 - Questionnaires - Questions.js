exports.up = (knex) => {
  return knex.schema.table('questions', (table) => {
    table
      .integer('questionnaire_id')
      .unsigned()
      .references('id')
      .inTable('questionnaires')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.table('questions', (table) => {
    table.dropColumn('questionnaire_id');
  });
};
