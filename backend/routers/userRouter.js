const router = require("express").Router();

const userCtrl = require("../controllers/authControllers");
const auth=require("../middleware/auth")


router.post("/signup", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);

router.post("/login",userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.forgotPassword)
router.post('/reset', auth, userCtrl.resetPassword)
router.get('/infor', auth, userCtrl.getUserInfor)
router.get('/logout', userCtrl.logout)
router.patch('/update', auth, userCtrl.updateUser)
router.post('/google_login', userCtrl.googleLogin)




module.exports = router;
