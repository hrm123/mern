const launches = [
	{
		id: 1,
		launchDate: '2026-10-10',
		flightNumber: 1,
		planetName: 'Mars'
	},
	{
		id: 2,
		launchDate: '2026-12-04',
		flightNumber: 2,
		planetName: 'Jupiter'
	}
];


function getAllLaunches(test) {
	if (test) {
		// console.log('Getting all launches - test mode');
		return launches;
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function getLaunchesByPlanet(planetName, test = false) {
	if (test) {
		// console.log('Getting products by price range - test mode');
		return launches.filter(launch => launch.planetName === planetName);
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function addLaunch(planetName, launchDate, flightNumber) {
	const newLaunch = {
		id: launches.length + 1,
		launchDate,
		flightNumber,
		planetName
	};
	launches.push(newLaunch);
	return newLaunch;
}

module.exports = {
	getAllLaunches,
	getLaunchesByPlanet,
	addLaunch
}