/**
 * Database conexion
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('project', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    storage: './project.db',
    operatorsAliases: 0,
});

module.exports = sequelize;