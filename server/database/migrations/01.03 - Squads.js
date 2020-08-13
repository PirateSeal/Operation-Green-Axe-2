exports.up = (knex) => {
  return knex.schema.createTable('squads', (table) => {
    table.increments();
    table.text('name').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('squads');
};
