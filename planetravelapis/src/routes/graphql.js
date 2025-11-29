const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const path = require('path');
const productsModel = require('../products/products.model');
const ordersModel = require('../orders/orders.model');
const customersModel = require('../customers/customers.model');

const loadedTypes = loadFilesSync(path.join(__dirname, '..'), {
	extensions: ['graphql'],
});

const typeDefinitions = mergeTypeDefs(loadedTypes);

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

const resolvers = {
	Query: {
		products: () => productsModel,
		orders: () => ordersModel,
		customers: () => customersModel
	}
};

const schema = makeExecutableSchema({
	typeDefs: typeDefinitions,
	resolvers,
});

module.exports = {
	schema,
	query1,
	query1Result
};
