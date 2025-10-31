const express = require('express');
const { body, validationResult } = require('express-validator');
const { Customer, addCustomer, getAllCustomers } = require('../models/customer');

const router = express.Router();

// POST /customer expects { name, email }
router.post(
    '/customer',
    [
        body('name').exists().withMessage('name is required').isString(),
        body('email').exists().withMessage('email is required').isEmail().withMessage('email must be valid'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email } = req.body;
        const customer = new Customer(name, email);
        addCustomer(customer);
        return res.status(201).json(customer);
    }
);

router.get('/customers', (req, res) => {
    return res.status(200).json(getAllCustomers());
});

module.exports = router;
