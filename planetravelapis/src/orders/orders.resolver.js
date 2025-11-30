const ordersModel = require('./orders.model');

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    Query: {
        orders: () => {
            if(isProduction){
                // console.log('--------------- Fetching orders --------------- ');
                return ordersModel.getAllOrders();
            } else {
                // console.log('--------------- Fetching orders in TEST mode --------------- ');
                return ordersModel.getAllOrders(true);
            }
        },
    }
}