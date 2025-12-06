const { Mutation } = require('../products/products.resolver');
const planetsModel = require('./planets.model');

const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    Query: {
        planets: () => {
            if (isProduction) {
                // console.log('--------------- Fetching planets --------------- ');
                return planetsModel.getAllPlanets();
            } else {
                // console.log('--------------- Fetching planets in TEST mode --------------- ');
                return planetsModel.getAllPlanets(true);
            }
        }
    },
    Mutation: {
        addPlanet: (_, args) => {
            const { name } = args;
            // console.log(`--------------- Adding review ${note} for product ${pid} --------------- `);
            return planetsModel.addPlanet(name);
        }
    }
}