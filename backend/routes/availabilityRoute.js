const express= require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController")

router.route("/getAvailability/:id").get(availabilityController.getAvailability)
router.route("/createAvailability/:userId").post(availabilityController.createAvailability);

module.exports = router;