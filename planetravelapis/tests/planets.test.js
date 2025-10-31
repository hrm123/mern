const request = require('supertest');
const app = require('../src/server');

describe('Planets API', () => {
  test('POST /apis/planet creates a planet (201)', async () => {
    const res = await request(app)
      .post('/apis/planet')
      .send({ keplerName: 'Kepler-452b' })
      .set('Accept', 'application/json')
      .expect(201);

    expect(res.body).toHaveProperty('keplerName', 'Kepler-452b');
  });

  test('POST /apis/planet missing keplerName returns 400', async () => {
    await request(app).post('/apis/planet').send({}).expect(400);
  });

  test('GET /apis/planets returns array', async () => {
    const res = await request(app).get('/apis/planets').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
