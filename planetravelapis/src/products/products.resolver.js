const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            console.log('--------------- Fetching products --------------- ');
            return productsModel.getAllProducts();
        },
    }
}