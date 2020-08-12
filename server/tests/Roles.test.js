/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const knex = require('../database/index');

const token = process.env.JWT_TOKEN;

const role1 = { name: 'test', short: 'tst' };
let role1ID = 0;

const role2 = { name: 'test2', short: 'txt' };
let role2ID = 0;

const updatedRole = { name: 'NTest', short: 'nTST' };

// eslint-disable-next-line consistent-return
beforeAll(async () => {
  jest.resetModules();
  if (!knex.client.pool) knex.initialize();
  await knex.migrate.rollback();
  return knex.migrate.latest();
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
      .send(role1)
      .expect((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(role1.name);
        expect(res.body.short).toBe(role1.short);
        role1ID = res.body.id;
        console.log(res.body);
      });
  });

  it('should read created role', async () => {
    await request(app)
      .get(`/api/v1/roles/${role1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(role1.name);
        expect(res.body.short).toBe(role1.short);
      });
  });

  it('should update created role', async () => {
    await request(app)
      .patch(`/api/v1/roles/${role1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(updatedRole)
      .expect((res) => {
        console.log(res.status);
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedRole.name);
        expect(res.body.short).toBe(updatedRole.short);
      });
  });

  it('should get updated role', async () => {
    await request(app)
      .get(`/api/v1/roles/${role1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedRole.name);
        expect(res.body.short).toBe(updatedRole.short);
      });
  });

  it('should delete modified role', async () => {
    await request(app)
      .delete(`/api/v1/roles/${role1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should read 0 roles', async () => {
    await request(app)
      .get('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
      });
  });

  it('should create a new role again', async () => {
    await request(app)
      .post('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(role1)
      .expect((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(role1.name);
        expect(res.body.short).toBe(role1.short);
        role1ID = res.body.id;
      });
  });

  it('Name already exists', async () => {
    await request(app)
      .post('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(role1)
      .expect((res) => {
        expect(res.status).toBe(409);
      });
  });

  it('should create another role', async () => {
    await request(app)
      .post('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(role2)
      .expect((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(role2.name);
        expect(res.body.short).toBe(role2.short);
        role2ID = res.body.id;
      });
  });

  it('should read all created roles', async () => {
    await request(app)
      .get('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe(role1.name);
        expect(res.body[0].short).toBe(role1.short);
        expect(res.body[1].name).toBe(role2.name);
        expect(res.body[1].short).toBe(role2.short);
      });
  });

  it('should delete role1 role', async () => {
    await request(app)
      .delete(`/api/v1/roles/${role1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should delete role2 role', async () => {
    await request(app)
      .delete(`/api/v1/roles/${role2ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should read no role', async () => {
    await request(app)
      .get('/api/v1/roles')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
      });
  });
});
