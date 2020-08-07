exports.up = (knex, Promise) => {
  return knex.schema.createTable("roles", (table) => {
    table.increments();
    table.text("name").notNullable();
    table.text("short").notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("roles");
};
