const customersModel = require('./customers.model');

module.exports = {
    Query: {
        orders: () => {
            console.log('--------------- Fetching customers --------------- ');
            return customersModel.getAllCustomers();
        },
    }
}