const express = require('express');
const router = express.Router();

const signupForm = require('../models/signupModel');

router.post('/signup', (req, res) => {
    const signupUser = new signupForm ({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    })
    signupUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = router;