const request = require('supertest');
const app = require('../src/server');
const { query1, query1Result, query2, query2Response,
    query3, query3Response, query4, query4Response,
    mutation1, mutation1Response
 } = require('./dataset');




describe('GraphQL API', () => {
    test('POST /graphql returns expected data for query1', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: query1 })
            .expect(200);

        expect(res.body).toEqual(JSON.parse(query1Result));
    });

    test('POST /graphql returns expected data for query2', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: query2 })
            .expect(200);

        expect(res.body).toEqual(JSON.parse(query2Response));
    });

    test('POST /graphql products by price range returns expected response', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: query3 })
            .expect(200);

        expect(res.body).toEqual(JSON.parse(query3Response));
    });

    test('POST /graphql gets all reviews', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: query4 })
            .expect(200);

        expect(res.body).toEqual(JSON.parse(query4Response));
    });

    test('/graphql add product wroks', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: mutation1 })
            .expect(200);

        expect(res.body).toEqual(JSON.parse(mutation1Response));
    });

});
