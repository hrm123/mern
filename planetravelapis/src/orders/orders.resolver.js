const ordersModel = require('./orders.model');

module.exports = {
    Query: {
        orders: () => {
            console.log('--------------- Fetching orders --------------- ');
            return ordersModel.getAllOrders();
        },
    }
}