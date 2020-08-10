exports.up = (knex, Promise) => {
  return knex.schema.createTable("squads", (table) => {
    table.increments();
    table.text("name").notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("squads");
};
