exports.up = (knex, Promise) => {
  return knex.schema.table("users", (table) => {
    table.integer("team_id").unsigned().references("id").inTable("teams");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("team_id");
  });
};
