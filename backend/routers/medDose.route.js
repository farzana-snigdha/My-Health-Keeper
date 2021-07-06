const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const { getDoses } = require("../controllers/medDose.controller");

router.get('/medDose',auth, getDoses);

module.exports=router;