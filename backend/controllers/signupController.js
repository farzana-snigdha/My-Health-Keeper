const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const signup = async (req, res) => {
  try {
    let { name, email, pass, re_pass, gender,  phone } =
      req.body;
      console.log(pass)
    // if (!(email || pass || re_pass || name || gender))
    //   return res
    //     .status(400)
    //     .json({ errorMessage: "Please enter all required fields." });

    if (String(pass).length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (String(phone).length < 11)
      return res.status(400).json({
        errorMessage: "Please enter a valid phone number.",
      });

    if (!(pass == re_pass))
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
    passwordHash = await bcrypt.hash(pass, salt);
    //   console.log(passwordHash);
    user = new User({
      name,
      email,
      passwordHash,
      gender,
      phone,
     
      gravatar,
    });
    const existingUser = await user.save();
    // console.log("id: ",existingUser._id, existingUser.email)
    
    const token = jwt.sign(
        {
          user: existingUser._id,
         
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
       
      );
      res.status(200).json({result:existingUser,token})
      console.log("token: ",token)
      // res.redirect("/dashboard")
      
  } catch (error) {
    console.error("sdd "+error.message);
    res.status(502).send(error.message);
  }
};

module.exports = signup;
