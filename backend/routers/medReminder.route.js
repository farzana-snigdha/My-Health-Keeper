const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth")

const {getMedicine,postMedicine} = require('../controllers/medReminder.controller');

router.get('/medReminder', auth, getMedicine);
router.post('/medReminder', auth, postMedicine);

module.exports=router;