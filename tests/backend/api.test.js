const request = require('supertest');
const app = require('../../backend/app');

describe('Backend API Tests', () => {
  test('GET /api/papers returns 200', async () => {
    const response = await request(app).get('/api/papers');
    expect(response.statusCode).toBe(200);
  });

  test('POST /api/papers creates a new paper', async () => {
    const response = await request(app)
      .post('/api/papers')
      .send({ title: 'Test Paper', content: 'Test Content' });
    expect(response.statusCode).toBe(201);
  });
});
