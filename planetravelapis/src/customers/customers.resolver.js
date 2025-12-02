const customersModel = require('./customers.model');

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    Query: {
        orders: () => {
            if (isProduction) {
                // console.log('--------------- Fetching customers --------------- ');
                return customersModel.getAllCustomers();
            } else {
                // console.log('--------------- Fetching customers in TEST mode --------------- ');
                return customersModel.getAllCustomers(true);
            }
        },
    },
    Mutation: {
        registerCustomer: (_, { name, email, password }) => {
            return customersModel.addCustomer(name, email, password);
        }
    }
}