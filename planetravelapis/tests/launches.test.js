const request = require('supertest');
const app = require('../src/server');

describe('Launches API', () => {
  const launchPayload = {
    launchDate: '2025-10-30',
    flightNumber: 42,
    planetName: 'Kepler-186f',
  };

  test('POST /apis/launch creates a launch (201)', async () => {
    const res = await request(app)
      .post('/apis/launch')
      .send(launchPayload)
      .set('Accept', 'application/json')
      .expect(201);

    expect(res.body).toHaveProperty('flightNumber', 42);
    expect(res.body).toHaveProperty('planetName', 'Kepler-186f');
  });

  test('POST /apis/launch missing fields returns 400', async () => {
    await request(app).post('/apis/launch').send({}).expect(400);
  });

  test('GET /apis/launches returns array', async () => {
    const res = await request(app).get('/apis/launches').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
