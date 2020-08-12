/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const knex = require('../../../database/index');

const token = process.env.JWT_TOKEN;

const squad1 = { name: 'test' };
let squad1ID = 0;

const squad2 = { name: 'test2' };
let squad2ID = 0;

const updatedSquad = { name: 'NTest' };

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

describe('Squad endpoints', () => {
  it('should create a new squad', async () => {
    await request(app)
      .post('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(squad1)
      .expect((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(squad1.name);
        squad1ID = res.body.id;
      });
  });

  it('should read created squad', async () => {
    await request(app)
      .get(`/api/v1/squads/${squad1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(squad1.name);
      });
  });

  it('should update created squad', async () => {
    await request(app)
      .patch(`/api/v1/squads/${squad1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(updatedSquad)
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedSquad.name);
      });
  });

  it('should get updated squad', async () => {
    await request(app)
      .get(`/api/v1/squads/${squad1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedSquad.name);
      });
  });

  it('should delete modified squad', async () => {
    await request(app)
      .delete(`/api/v1/squads/${squad1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should read 0 squads', async () => {
    await request(app)
      .get('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
      });
  });

  it('should create a new squad again', async () => {
    await request(app)
      .post('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(squad1)
      .expect((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(squad1.name);
        squad1ID = res.body.id;
      });
  });

  it('Name already exists', async () => {
    await request(app)
      .post('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(squad1)
      .expect((res) => {
        expect(res.status).toBe(409);
      });
  });

  it('should create another squad', async () => {
    await request(app)
      .post('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(squad2)
      .expect((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(squad2.name);
        squad2ID = res.body.id;
      });
  });

  it('should read all created squads', async () => {
    await request(app)
      .get('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe(squad1.name);
        expect(res.body[1].name).toBe(squad2.name);
      });
  });

  it('should delete squad1 squad', async () => {
    await request(app)
      .delete(`/api/v1/squads/${squad1ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should delete squad2 squad', async () => {
    await request(app)
      .delete(`/api/v1/squads/${squad2ID}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should read no squad', async () => {
    await request(app)
      .get('/api/v1/squads')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
      });
  });
});
