/**
 * Queries for events
 */

const Repo = require('../database/Models/Repo');

const getById = async (id) => {
    return await Repo.findByPk(id);
}

const createRepo = async (data) => {
    const { id, name, url } = data;
    await Repo.create({
        id,
        name,
        url,
    });
};

const deleteRepo = async () => {
    await Repo.destroy({
        where: {},
        truncate: true,
    });
}

module.exports = {
    getRepoById: getById,
    createRepo,
    deleteRepo
}