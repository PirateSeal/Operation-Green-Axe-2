exports.up = (knex, Promise) => {
  return knex.schema.createTable("inter_teams_squads", (table) => {
    table.increments();
    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("teams")
      .notNullable();
    table
      .integer("squad_id")
      .unsigned()
      .references("id")
      .inTable("squads")
      .notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("inter_teams_squads");
};
