/**
 * Queries for events
 */

const Sequelize = require('sequelize');
const Actor = require('../database/Models/Actor');
const Event = require('../database/Models/Event');

const getById = async (id) => {
    return await Actor.findByPk(id);
}

const createActor = async (data) => {
    const { id, login, avatar_url } = data;
    await Actor.create({
        id,
        login,
        avatar_url,
    });
}

const deleteActors = async () => {
    await Actor.destroy({
        where: {},
        truncate: true,
    });
}

const updateActorInfo = async (id, avatar_url) => {
    return await Actor.update({
            avatar_url,
        }, {
        where: {
          id,
        },
    });
}

const getAllActorsInfo = async () => {
    let actors = await Actor.findAll({
        attributes: {
          include: [
            'id',
            'login',
            'avatar_url',
            [Sequelize.fn('COUNT', Sequelize.col('events.actorId')), 'eventCount'],
            [Sequelize.fn('max', Sequelize.col('events.created_at')), 'latestEvent'],
          ],
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [{
          model: Event, attributes: [],
        }],
        group: ['events.actorId'],
        order: [
          [Sequelize.literal('eventCount'), 'DESC'],
          [Sequelize.literal('latestEvent'), 'DESC'],
          ['login'],
        ],
    });

    return modifiedActors = actors.map(actor => ({
      id: actor.id,
      login: actor.login,
      avatar_url: actor.avatar_url,
    }));
}

const getActorId = async (actorId) => {
  return Actor.findOne({
          where: {
            id: actorId,
          },
          attributes: {
            include: ['id', 'login', 'avatar_url' ],
            exclude: ['createdAt', 'updatedAt'],
          },
        })
}

module.exports = {
    getActorById: getById,
    createActor,
    deleteActors,
    updateActorInfo,
    getAllActorsInfo,
    getActorId
}