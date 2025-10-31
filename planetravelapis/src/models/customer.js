let nextCustomerId = 1;

class Customer {
    constructor(name, email) {
        this.id = nextCustomerId++;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
}

const customers = new Map();

function addCustomer(customer) {
    customers.set(customer.id, customer);
    return customer;
}

function getAllCustomers() {
    return Array.from(customers.values());
}

module.exports = {
    Customer,
    addCustomer,
    getAllCustomers
};
