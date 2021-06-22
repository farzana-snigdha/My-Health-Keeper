const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");


const getLogin=async(req,res) => {
    let user = await User.findById(req.user._id).select("-password");
    if(!user){
        return res.status(400).json({msg: 'userNotFound'})
    }
    res.send(user)

}


const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
       
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
     
     
    );
    res.status(200).json({result:existingUser,token})
    // console.log( localStorage.getItem("jwtToken"))
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {postLogin,getLogin};
