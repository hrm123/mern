const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const path = require('path');
// const ordersModelHardcoded = require('../orders/orders.model');
// const customersModelHardcoded = require('../customers/customers.model');

const loadedTypes = loadFilesSync(path.join(__dirname, '..'), {
	extensions: ['graphql'],
});

const resolversList = loadFilesSync(path.join(__dirname, '..','**/*.resolver.js'));

const typeDefinitions = mergeTypeDefs(loadedTypes);


const schema = makeExecutableSchema({
	typeDefs: typeDefinitions,
	resolvers: resolversList,
});

module.exports = {
	schema,
};
