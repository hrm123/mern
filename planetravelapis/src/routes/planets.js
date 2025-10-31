const express = require('express');
const { body, validationResult } = require('express-validator');
const { Planet, addPlanet, getAllPlanets } = require('../models/planet');

const router = express.Router();

router.post(
    '/planet',
    [
        body('keplerName')
            .exists()
            .withMessage('keplerName is required')
            .isString()
            .withMessage('keplerName must be a string'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { keplerName } = req.body;
        const planet = new Planet(keplerName);
        addPlanet(planet);
        return res.status(201).json(planet);
    }
);

router.get('/planets', (req, res) => {
    return res.status(200).json(getAllPlanets());
});

module.exports = router;
