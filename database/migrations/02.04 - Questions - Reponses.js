exports.up = (knex, Promise) => {
  return knex.schema.table("reponses", (table) => {
    table
      .integer("question_id")
      .unsigned()
      .references("id")
      .inTable("questions")
      .notNullable();
    table.integer("user_id").unsigned().references("id").inTable("users");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.table("questions", (table) => {
    table.dropColumn("questionnaire_id");
  });
};
