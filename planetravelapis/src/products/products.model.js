const products = [
				{
					id: 1,
					description: 'Red SHoe',
					price: 42.12
				},
				{
					id: 2,
					description: 'Blue Jean',
					price: 12.34
				}
			];

		
function getAllProducts(test) {
	if(test) {
		// console.log('Getting all products - test mode');
		return products;
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function addProduct(description, price) {
	const newProduct = {
		id: products.length + 1,
		description,
		price
	};
	products.push(newProduct);
	return newProduct;
}

function getProductsByPrice(min,max,test=false) {
	if(test) {
		// console.log('Getting products by price range - test mode');
		return products.filter(product => product.price >= min && product.price <= max);;
	}
	return null; // TODO - fetch from actual databse in real scenario
}
		
module.exports = {
	getAllProducts,
	getProductsByPrice,
	addProduct
}