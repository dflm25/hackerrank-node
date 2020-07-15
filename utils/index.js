/**
 * Function utilities for the application
 */

const moment = require('moment');
var _ = require('lodash');

const lookEvents = (events) => {
    const newObject = {};

	events.forEach(event => {
        const { actorId, created_at } = event;
        
        if (newObject[actorId]) {
            const lastEvent = moment(newObject[actorId].lastEvent, 'YYYY-MM-DD');
            const currentEvent = moment(created_at, 'YYYY-MM-DD');
            const daysDiff = lastEvent.diff(currentEvent, 'days');

            if (daysDiff === 1) {
                newObject[actorId].current += 1;
                
                if (newObject[actorId].current > newObject[actorId].highest) {
                    newObject[actorId].highest = newObject[actorId].current;
                }

            } else if (daysDiff > 1) {
                newObject[actorId].current = 0;
            }
        } else {
            newObject[actorId] = {
                current: 0,
                highest: 0,
                lastEvent: created_at,
                latestEvent: moment(created_at).valueOf(),
                login: event.actor.login,
            }
        }
    });
    
    return newObject;
}

const convertToArray = (data) => {

    const ArrayData = Object.keys(data).map(actorId => ({
        actorId,
        highest: data[actorId].highest,
        latestEvent: data[actorId].latestEvent,
        login: data[actorId].login,
    }));

    return _.orderBy(
        ArrayData,
        ['highest', 'latestEvent', 'login'],
        ['desc', 'desc', 'asc']);

}

const getActorsIdByStreak = sortedStreakInfo => sortedStreakInfo.map(info => Number(info.actorId));

module.exports = {
    lookEvents,
    convertToArray,
    getActorsIdByStreak
}