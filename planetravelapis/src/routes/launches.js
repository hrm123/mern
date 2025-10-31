const express = require('express');
const { body, validationResult } = require('express-validator');
const { Launch, addLaunch, getAllLaunches } = require('../models/launch');

const router = express.Router();

router.post(
    '/launch',
    [
        body('launchDate')
            .exists()
            .withMessage('launchDate is required')
            .isISO8601()
            .withMessage('launchDate must be a valid ISO8601 date'),
        body('flightNumber').exists().withMessage('flightNumber is required'),
        body('planetName')
            .exists()
            .withMessage('planetName is required')
            .isString()
            .withMessage('planetName must be a string'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { launchDate, flightNumber, planetName } = req.body;
        const launch = new Launch(launchDate, flightNumber, planetName);
        addLaunch(launch);
        return res.status(201).json(launch);
    }
);

router.get('/launches', (req, res) => {
    return res.status(200).json(getAllLaunches());
});

module.exports = router;