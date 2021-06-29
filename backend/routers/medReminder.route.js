const express = require("express");
const router = express.Router();

const {getMedicine,postMedicine} = require('../controllers/medReminder.controller');

router.get('/medReminder', getMedicine);
router.post('/medReminder', postMedicine);

module.exports=router;