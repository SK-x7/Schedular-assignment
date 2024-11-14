const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.route("/getAllEvents").get(eventController.getAllEvents);
router.route("/getAllEvents/:id").get(eventController.getEventsByInstructor);
router.route("/createEvent").post(eventController.createEvent);

module.exports = router;