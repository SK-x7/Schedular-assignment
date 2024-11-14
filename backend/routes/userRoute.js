const express=require("express");
const router = express.Router();
const userController=require("../controllers/userController");

router.route("/getAllUsers").get(userController.getAllUsers);
router.route("/checkUserInDb").post(userController.checkUserInDb);
router.route("/createUser").post(userController.createUser);

module.exports = router;