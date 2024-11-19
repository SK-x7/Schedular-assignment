const express=require("express");
const bookingController = require("../controllers/bookingController");
const router=express.Router();

router.route("/getBookingsOfEvent/:instructorId/:eventId/").get(bookingController.getBookingsOfEvent);
router.route("/getBookingsOfEvent/:studentId").get(bookingController.getBookingsOfUser);
router.route("/deleteBooking/:bookingId").delete(bookingController.deleteBooking);
router.route("/createBooking").post(bookingController.createBooking);

module.exports = router;