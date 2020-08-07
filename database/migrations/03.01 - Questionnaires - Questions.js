exports.up = (knex, Promise) => {
  return knex.schema.table("questions", (table) => {
    table
      .integer("questionnaire_id")
      .unsigned()
      .references("id")
      .inTable("questionnaires")
      .notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.table("questions", (table) => {
    table.dropColumn("questionnaire_id");
  });
};
