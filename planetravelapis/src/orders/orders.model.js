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
	if(test) {
		// console.log('Getting all orders - test mode');
		return orders;
	}
	return null; // TODO - fetch from actual databse in real scenario
}

module.exports = {
	getAllOrders
}