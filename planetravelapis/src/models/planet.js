class Planet {
    constructor(keplerName) {
        this.keplerName = keplerName;
    }
}

const planets = new Map();

function addPlanet(planet) {
    planets.set(planet.keplerName, planet);
    return planet;
}

function getAllPlanets() {
    return Array.from(planets.values());
}

module.exports = {
    Planet,
    addPlanet,
    getAllPlanets
};
