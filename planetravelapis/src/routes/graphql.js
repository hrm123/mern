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


// resolver functions get following arguments - (parent, args, context, info)
// parent is the root object,  args is additional arguments (authentication etc), 
// context is shared object across resolvers, info is query related info
const resolversOld = {
	Query: {
		products: async (parent, args, context, info) => {
			console.log({ parent, args, context, info });
			if (!parent) {
				return await Promise.resolve(context.rootValue.products);
			}

			return await Promise.resolve(parent.products);
		},
		orders: (parent, args, context) => {
			if (!parent) {
				return context.rootValue.orders;
			}
			return parent.orders;
		},
		customers: (parent, args, context) => {
			if (!parent) {
				return context.rootValue.customers;
			}
			return parent.customers;
		}
	}
};

const schema = makeExecutableSchema({
	typeDefs: typeDefinitions,
	resolvers: resolversList,
});

module.exports = {
	schema,
};
