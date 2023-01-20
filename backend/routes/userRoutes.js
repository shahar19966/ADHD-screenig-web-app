const express = require('express');
const { registerUser, authUser,updateUserProfile, StartScreening,StopScreening} = require('../controllers/userControllers')
const { protect } =require( "../middleware/authMiddleware.js");

const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route("/profile").post(protect, updateUserProfile);
router.route("/startScreening").post(StartScreening);
router.route("/stopScreening").get(StopScreening);

module.exports = router;