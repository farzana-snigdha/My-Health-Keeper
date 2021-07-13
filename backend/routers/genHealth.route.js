const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const {postHealthInfo} = require('../controllers/genHealthController');

router.post('/addGenHealth',auth,postHealthInfo);

module.exports=router;