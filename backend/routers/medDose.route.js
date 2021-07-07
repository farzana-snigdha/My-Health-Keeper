const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const { getDoses, doseConfirmUpdate } = require("../controllers/medDose.controller");

router.get('/medDose',auth, getDoses);
router.post('/medDose/:id', doseConfirmUpdate);

module.exports=router;