exports.up = (knex, Promise) => {
  return knex.schema.createTable("inter_squads_users", (table) => {
    table.increments();
    table
      .integer("squad_id")
      .unsigned()
      .references("id")
      .inTable("squads")
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("inter_squads_users");
};
