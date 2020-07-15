/**
 * Events controller 
 * Methods (getAllEvents, addEvent, getByActor, eraseEvents)
 */
const { getEvents, getEventById, createEvent, deleteEvents, getEventByActor } = require('../services/event');
const { getActorById, createActor, deleteActors } = require('../services/actor');
const { getRepoById, createRepo, deleteRepo } = require('../services/repo');

const getAllEvents = async (req, res) => {
	let events = await getEvents();
	
	return res.status(200).send(events);
};

const addEvent = async (req, res) => {
	const { id, type, actor, repo } = req.body;

	// Validation data
	if (await getEventById(id)) {
		return res.status(400).send({});
	}

	if (!await getActorById(actor.id)) {
		await createActor(actor);
	}

	if (!await getRepoById(repo.id)) {
		await createRepo(repo);
	}

	await createEvent(req.body);
	return res.status(201).send({});
};

const getByActor = async (req, res) => {
	const { id } = req.params;

	// Validate: if actor exist
	if (!await getActorById(id)) {
		return res.status(404).send({});
	}

	let events = await getEventByActor(id);
	
	return res.status(200).send(events);
};

const eraseEvents = async (req, res) => {
	// Trucante all events
	await deleteEvents();
	await deleteActors();
	await deleteRepo();

	return res.status(200).send({});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















