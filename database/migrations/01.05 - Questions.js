exports.up = (knex, Promise) => {
  return knex.schema.createTable("questions", (table) => {
    table.increments();
    table.text("name").notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("questions");
};
