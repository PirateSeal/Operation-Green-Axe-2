const request = require('supertest');
const app = require('../app');

describe('Post Endpoints', () => {
  it('should create a new role', async () => {
    const res = await request(app).post('/api/roles').send({
      name: 'test',
      short: 'TST',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
  });
});
