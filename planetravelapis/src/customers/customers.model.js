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
	if(test) {
		return customers;
	}
	return customers; // eftch from database etc in real scenario
}
module.exports = {
	getAllCustomers
}