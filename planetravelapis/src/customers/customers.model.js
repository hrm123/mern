const customers = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john.doe@example.com',
		orders: [
			{
				id: 1,
				items: [
					{
						product: {
							id: 1,
							description: 'Red SHoe',
							rating: 4,
							quantity: 2,
							comment: 'Great Shoe'
						}
					}
				]
			}
		]
	}
];

function getAllCustomers(test) {
	if (test) {
		// console.log('Getting all customers - test mode');
		return customers;
	}
	return null; // eftch from database etc in real scenario
}

function addCustomer(name, email, password) {
	const newCustomer = {
		id: customers.length + 1,
		name,
		email,
		password, // In a real app, hash this!
		orders: []
	};
	customers.push(newCustomer);
	return newCustomer;
}

module.exports = {
	getAllCustomers,
	addCustomer
}