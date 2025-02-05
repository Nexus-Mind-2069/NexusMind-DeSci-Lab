const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  it('GET /api/research should return research papers', async () => {
    const res = await request(app)
      .get('/api/research')
      .set('Authorization', 'Bearer test_api_key');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('POST /api/submit should submit a new paper', async () => {
    const res = await request(app)
      .post('/api/submit')
      .set('Authorization', 'Bearer test_api_key')
      .send({
        title: 'Test Paper',
        abstract: 'This is a test abstract',
        content: 'This is the full content of the test paper',
        authors: ['Test Author']
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toEqual('submitted');
  });
});
