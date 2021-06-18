const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const signup = async (req, res) => {
  try {
    let { name, email, password, passwordVerify, gender, dateOfBirth, phone } =
      req.body;
    if (!(email || password || passwordVerify || name || gender))
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (phone.length < 11)
      return res.status(400).json({
        errorMessage: "Please enter a valid phone number.",
      });

    if (!(password == passwordVerify))
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: { message: "Already Registered" } });
    }
    const avatar = gravatar.url(email, {
      //  s: '200',
      r: "g",
      //  d: 'mm'
    });

    const salt = await bcrypt.genSaltSync(10);
    passwordHash = await bcrypt.hash(password, salt);
    //   console.log(passwordHash);
    user = new User({
      name,
      email,
      passwordHash,
      gender,
      phone,
      dateOfBirth,
      gravatar,
    });
    const savedUser = await user.save();

    const token = jwt.sign(
        {
          user: existingUser._id,
          email: existingUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ result: token });
        }
      );
      
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = signup;
