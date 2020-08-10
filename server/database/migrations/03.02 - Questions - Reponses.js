exports.up = (knex) => {
  return knex.schema.table('reponses', (table) => {
    table
      .integer('question_id')
      .unsigned()
      .references('id')
      .inTable('questions')
      .notNullable();

    table.integer('user_id').unsigned().references('id').inTable('users');
  });
};

exports.down = (knex) => {
  return knex.schema.table('reponses', (table) => {
    table.dropColumn('question_id');
    table.dropColumn('user_id');
  });
};
