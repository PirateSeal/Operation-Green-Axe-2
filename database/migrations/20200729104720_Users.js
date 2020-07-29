exports.up = (knex, Promise) => {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.text("display_name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.text("google_id");
    table.boolean("admin").notNullable().default(false);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("users");
};
