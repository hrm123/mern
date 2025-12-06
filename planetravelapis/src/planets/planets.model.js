const planets = [
	{
		name: 'Mars'
	},
	{
		name: 'Jupiter'
	}
];


function getAllPlanets(test) {
	if (test) {
		// console.log('Getting all planets - test mode');
		return planets;
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function addPlanet(name) {
	const newPlanet = {
		id: planets.length + 1,
		name
	};
	planets.push(newPlanet);
	return newPlanet;
}

module.exports = {
	getAllPlanets,
	addPlanet
}