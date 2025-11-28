const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const router = express.Router();

const schema = buildSchema(`
	type Query{
		products : [Product],
		orders: [Order],
		customers: [Customer]
	}
	type Product{
		id: ID!
		description: String!
		reviews: [Review]
		price: Float!
	}
	type Review{
		id: ID!
		comment: String!
		rating: Int!
	}
	type Order{
		id: ID!
		items: [OrderItem]
		subtotal: Float!
		customer: Customer!
		orderDate: String!
	}
	type OrderItem{
		product: Product!
		quantity: Int!
	}
	type Customer{
		id: ID!
		name: String!
		email: String!
		orders: [Order]
	}
`);

const query1 = `
{
  orders {
    subtotal
    items{
      quantity
      product { 
        id
        price
        reviews {
          comment
          rating
        }
      }
    }
  }
}
`;
const query1Result = `
{
  "data": {
    "orders": [
      {
        "subtotal": 888.88,
        "items": [
          {
            "quantity": 2,
            "product": {
              "id": "1",
              "price": 42.12,
              "reviews": null
            }
          }
        ]
      }
    ]
  }
}`;

const root = {
	description: 'Red SHoe',
	price: 42.12
}

const rootValue = {
	products: () => {
		return [
			{
				id: 1,
				description: 'Red SHoe',
				price: 42.12
			}
		]
	},
	orders: () => {
		return [
			{
				id: 1,
				subtotal: 888.88,
				orderDate: '2022-01-01',
				customer: {
					id: 1,
					name: 'John Doe',
					email: 'john.doe@example.com',
				},
				items: [
					{
						product: {
							id: 1,
							description: 'Red SHoe',
							rating: 4,
							price: 42.12,
							comment: 'Great Shoe'
						},
						quantity: 2,
					}
				]
			}
		]
	},
	customers: () => {
		return [
			{
				id: 1,
				name: 'John Doe',
				email: 'john.doe@example.com',
				orders: [
					{
						id: 1,
						items: [
							{
								product: {
									id: 1,
									description: 'Red SHoe',
									rating: 4,
									quantity: 2,
									comment: 'Great Shoe'
								}
							}
						]
					}
				]
			}
		]
	}
};

router.use('/', graphqlHTTP({
	schema: schema,
	rootValue: rootValue,
	graphiql: true
}));

module.exports = router;
