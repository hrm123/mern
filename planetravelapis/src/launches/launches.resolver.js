const { Mutation } = require('../products/products.resolver');
const launchesModel = require('./launches.model');

const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    Query: {
        launches: () => {
            if (isProduction) {
                // console.log('--------------- Fetching launches --------------- ');
                return launchesModel.getAllLaunches();
            } else {
                // console.log('--------------- Fetching launches in TEST mode --------------- ');
                return launchesModel.getAllLaunches(true);
            }
        },
        /*
        launchesByPlanet: (_, args) => { // firsta argument is parent is not being used so we use '_'
            const { planetName } = args;
            // console.log(`--------------- Fetching launches for product ${pid} --------------- `);
            return launchesModel.getLaunchesByPlanet(planetName, !isProduction);
        }
        */
    },
    Mutation: {
        addLaunch: (_, args) => {
            const { note, pid } = args;
            // console.log(`--------------- Adding review ${note} for product ${pid} --------------- `);
            return launchesModel.addLaunch(note, pid);
        }
    }
}