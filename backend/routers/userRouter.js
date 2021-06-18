const router = require("express").Router();

const signup = require("../controllers/signupController");

router.post("/signup", signup);
module.exports = router;
