/**
 * Repository model
 */

const Sequelize = require('sequelize');
const sequelize = require('../sqlite');

const Repo = sequelize.define('repo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
});

module.exports = Repo;