exports.up = (knex) => {
  return knex.schema.createTable('reponses', (table) => {
    table.increments();
    table.text('reponse');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('reponses');
};
