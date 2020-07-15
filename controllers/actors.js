/**
 * Actors controller 
 * Methods (getAllActors, updateActor, getStreak)
 */
const { updateActorInfo, getActorById, getAllActorsInfo, getActorId } = require('../services/actor');
const { getAllEvents  } = require('../services/event');
const { lookEvents, convertToArray, getActorsIdByStreak } = require('../utils')

var getAllActors = async (req, res) => {
	let responseData = await getAllActorsInfo();
	
	return res.status(200).send(responseData);
};

var updateActor = async (req, res) => {
	const { id, avatar_url, login } = req.body;

	// Validate if actor exist
	let actorInfo = await getActorById(id);
	if (!actorInfo) {
		return res.status(404).send({});
	}

	if (login != actorInfo.login) {
		return res.status(400).send({});
	}

	await updateActorInfo (id, avatar_url);

	return res.status(200).send({});
};

var getStreak = async (req, res) => {
	let events = await getAllEvents();
	let objectOfStreak = lookEvents(events);
	let arrayOfStreak = convertToArray(objectOfStreak);
	let actorsIdByStreak = getActorsIdByStreak(arrayOfStreak);
	let actorsInOrder = await Promise.all(actorsIdByStreak.map(async actorId => await getActorId(actorId)));
	actorsInOrder = JSON.parse(JSON.stringify(actorsInOrder))

	return res.status(200).send(actorsInOrder);

};

module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















