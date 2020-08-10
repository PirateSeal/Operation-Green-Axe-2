exports.up = (knex) => {
  return knex.schema.createTable('inter_users_roles', (table) => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();
    table
      .integer('role_id')
      .unsigned()
      .references('id')
      .inTable('roles')
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('inter_users_roles');
};
