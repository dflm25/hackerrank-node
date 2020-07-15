/**
 * Queries for events
 */

const Event = require('../database/Models/Event');
const Actor = require('../database/Models/Actor');
const Repo = require('../database/Models/Repo');

const getAll = async () => {
    return events = await Event.findAll({
		attributes: {
			exclude: [
				'createdAt', 
				'updatedAt', 
				'actorId', 
				'repoId'
			],
		},
		include: [
			{
        		model: Actor,
       			attributes: [
					'id', 
					'login', 
					'avatar_url'
				],
			}, 
			{
				model: Repo,
				attributes: [
					'id', 
					'name', 
					'url'
				],
			},
		],
		order: [
			['id']
		],
	});
}

const getAllEvents = async () => {
	return await Event.findAll({
		include: [Actor],
		order: [
		  ['actorId'],
		  ['created_at', 'DESC'],
		],
	});
}

const getById = async (id) => {
    return await Event.findByPk(id);
}

const getEventByActor = async (id) => {
    return events = await Event.findAll({
		where: {
		  actorId: id,
		},
		attributes: {
		    exclude: [ 
                'createdAt', 
                'updatedAt', 
                'actorId', 
                'repoId'
            ],
		},
		include: [
		  {
			model: Actor,
			attributes: [ 
                'id', 
                'login', 
                'avatar_url' 
            ],
		  },
		  {
			model: Repo,
			attributes: [ 
                'id', 
                'name', 
                'url'
            ],
		  },
		],
		order: [['id']],
    });
}

const createEvent = async (data) => {
    const { id, type, actor, repo, created_at } = data;
    await Event.create({
        id,
        type,
        actorId: actor.id,
		repoId: repo.id,
		created_at
    });
}

const deleteEvents = async () => {
    await Event.destroy({
        where: {},
        truncate: true,
    });
}

module.exports = {
    getEvents: getAll,
    getEventById: getById,
    createEvent,
    deleteEvents,
	getEventByActor,
	getAllEvents
}