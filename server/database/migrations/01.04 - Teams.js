exports.up = (knex) => {
  return knex.schema.createTable('teams', (table) => {
    table.increments();
    table.text('name').unique().notNullable();
    table.text('short').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('teams');
};
