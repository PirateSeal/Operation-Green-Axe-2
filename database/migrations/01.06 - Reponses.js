exports.up = (knex, Promise) => {
  return knex.schema.createTable("reponses", (table) => {
    table.increments();
    table.text("reponse");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("reponses");
};
