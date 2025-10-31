class Launch {
    constructor(launchDate, flightNumber, planetName) {
        this.launchDate = new Date(launchDate);
        this.flightNumber = flightNumber;
        this.planetName = planetName;
    }
}

const launches = new Map();

function addLaunch(launch) {
    launches.set(launch.flightNumber, launch);
    return launch;
}

function getAllLaunches() {
    return Array.from(launches.values());
}

module.exports = {
    Launch,
    addLaunch,
    getAllLaunches
};