const express = require('express');
const router = express.Router();
const { eraseEvents } = require('../controllers/events');

// Routes related to event
router.delete('/', eraseEvents);

module.exports = router;
