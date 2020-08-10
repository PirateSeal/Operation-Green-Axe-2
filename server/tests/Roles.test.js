/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const knex = require('../database/index');

const token = process.env.JWT_TOKEN;
const test = { name: 'test', short: 'tst' };

// eslint-disable-next-line consistent-return
beforeAll(async () => {
  jest.resetModules();
  if (!knex.client.pool) return knex.initialize();
  await knex.migrate.rollback();
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex.migrate.rollback();
  return knex.destroy();
});

describe('Role endpoints', () => {
  it('should create a new role', async () => {
    await request(app)
      .post('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(test)
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(test.name);
        expect(res.body.short).toBe(test.short);
      });
  });

  it('should read created role', async () => {
    await request(app)
      .get('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe(test.name);
        expect(res.body[0].short).toBe(test.short);
      });
  });
});
