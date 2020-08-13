exports.up = (knex) => {
  return knex.schema.createTable('questionnaires', (table) => {
    table.increments();
    table.text('name').unique().notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('questionnaires');
};
