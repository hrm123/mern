const request = require('supertest');
const app = require('../src/server');

describe('Customers API', () => {
  test('POST /apis/customer creates a customer (201)', async () => {
    const res = await request(app)
      .post('/apis/customer')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .set('Accept', 'application/json')
      .expect(201);

    expect(res.body).toHaveProperty('name', 'Alice');
    expect(res.body).toHaveProperty('email', 'alice@example.com');
    expect(res.body).toHaveProperty('id');
  });

  test('POST /apis/customer missing fields returns 400', async () => {
    await request(app).post('/apis/customer').send({ name: 'Bob' }).expect(400);
  });

  test('GET /apis/customers returns array', async () => {
    const res = await request(app).get('/apis/customers').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
