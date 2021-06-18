const router = require("express").Router();

const signup = require("../controllers/signupController");
const {postLogin,getLogin} = require("../controllers/loginController");
const getDashboard = require("../controllers/dashboardController");
const auth=require("../middleware/auth.middleware")

router.post("/signup", signup);
router.post("/login",postLogin)
router.get('/logout', (req, res)=>  {
 
    res.redirect("/")
    console.log("ded")
  });
router.get('/dashboard',auth,getDashboard)
module.exports = router;
