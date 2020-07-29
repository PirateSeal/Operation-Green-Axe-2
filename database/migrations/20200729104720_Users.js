exports.up = (knex, Promise) => {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.text("display_name").notNullable();
    table.text("email").notNullable();
    table.text("google_id").notNullable();
    table.text("image_url").notNullable();
    table.boolean("admin").notNullable().default(false);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("users");
};
