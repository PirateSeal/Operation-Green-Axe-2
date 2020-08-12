const jest = require('jest');
const knex = require('../../database/index');

// eslint-disable-next-line consistent-return
const beforeAll = async () => {
  jest.resetModules();
  if (!knex.client.pool) knex.initialize();
  await knex.migrate.rollback();
  return knex.migrate.latest();
};

module.exports = {
  beforeAll,
};
