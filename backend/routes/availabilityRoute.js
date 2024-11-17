const express= require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController")

router.route("/getAvailability/instructor/:instructorId").get(availabilityController.getAvailability)
router.route("/getAvailability/user/:userId").get(availabilityController.getAvailabilityOfUser);
router.route("/createAvailability/:userId").post(availabilityController.createAvailability);

module.exports = router;