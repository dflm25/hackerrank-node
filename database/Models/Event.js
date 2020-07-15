/**
 * Event model
 */

const Sequelize = require('sequelize');
const sequelize = require('../sqlite');
const moment = require('moment');
const Repo = require('./Repo');
const Actor = require('./Actor');

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  type: Sequelize.STRING,
  created_at: {
    type: Sequelize.DATE,
    get() {
      const date = this.getDataValue('created_at');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
});

Event.belongsTo(Actor);
Event.belongsTo(Repo);
Actor.hasMany(Event);

module.exports = Event;