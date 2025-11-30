const productsModel = require('./products.model');

const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    Query: {
        products: () => {
            if(isProduction){
                console.log('--------------- Fetching products --------------- ');
                return productsModel.getAllProducts();
            } else {
                console.log('--------------- Fetching products in TEST mode --------------- ');
                return productsModel.getAllProducts(true);
            }
        },
        productsByPrice: (_, args) => { // firsta argument is parent is not being used so we use '_'
            const { minPrice, maxPrice } = args;
            console.log(`--------------- Fetching products with price between ${minPrice} and ${maxPrice} --------------- `);
            return productsModel.getProductsByPrice(minPrice, maxPrice, !isProduction);
        }
    }
}