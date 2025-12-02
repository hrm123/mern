const orders = [
	{
		id: 1,
		subtotal: 888.88,
		orderDate: '2022-01-01',
		customer: {
			id: 1,
			name: 'John Doe',
			email: 'john.doe@example.com',
		},
		items: [
			{
				product: {
					id: 1,
					description: 'Red SHoe',
					rating: 4,
					price: 42.12,
					comment: 'Great Shoe'
				},
				quantity: 2,
			}
		]
	}
];

function getAllOrders(test) {
	if (test) {
		// console.log('Getting all orders - test mode');
		return orders;
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function addOrder(productId, quantity) {
	// Mock product lookup - ideally import productsModel but for now we mock
	const product = {
		id: productId,
		description: 'Mock Product',
		price: 100.00
	};

	const newOrder = {
		id: orders.length + 1,
		subtotal: product.price * quantity,
		orderDate: new Date().toISOString(),
		customer: {
			id: 1, // Mock customer
			name: 'John Doe',
			email: 'john.doe@example.com'
		},
		items: [
			{
				product,
				quantity
			}
		]
	};
	orders.push(newOrder);
	return newOrder;
}

module.exports = {
	getAllOrders,
	addOrder
}