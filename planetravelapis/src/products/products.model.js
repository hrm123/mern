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
		return products;
	}
	return products; // TODO - fetch from actual databse in real scenario
}
		
module.exports = {
	getAllProducts
}