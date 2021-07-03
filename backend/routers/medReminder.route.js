const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth")

const {getMedicine,postMedicine,deleteMedicine} = require('../controllers/medReminder.controller');

router.get('/medReminder', auth, getMedicine);
router.post('/medReminder', auth, postMedicine);
router.delete('/medReminder/delete/:id',auth, deleteMedicine);

module.exports=router;