const request = require('supertest');
const app = require('../app');

describe('Role endpoints', () => {
  const OLD_ENV = process.env.NODE_ENV;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env.NODE_ENV = 'test'; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  it('should create a new role', async () => {
    const res = await request(app).post('/api/v1/roles').send({
      name: 'test',
      short: 'TST',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
  });
});
