const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");



const getDashboard=async(req,res) => {
    // let user = await User.findById(req.user._id).select("-password");
    // if(!user){
    //     return res.status(400).json({msg: 'userNotFound'})
    // }
    res.send("user")

}

module.exports = getDashboard;
