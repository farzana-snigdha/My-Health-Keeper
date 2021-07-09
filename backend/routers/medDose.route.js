const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const { getDoses, doseConfirmUpdate, getMissedDoses } = require("../controllers/medDose.controller");

router.get('/medDose',auth, getDoses);
router.get('/medDoseMissed/:id',auth, getMissedDoses);
router.post('/medDose/:id', doseConfirmUpdate);

module.exports=router;