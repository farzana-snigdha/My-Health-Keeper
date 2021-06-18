const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // const token = localStorage.getItem("jwtToken");
    // const isCustomAuth = token.length < 500;
    // console.log(token)
    //   try {
        
    //     let decodedData;
    
    //     if (token && isCustomAuth) {      
    //       decodedData = jwt.verify(token, secret);
    
    //       req.userId = decodedData?.id;
    //     } else {
    //       decodedData = jwt.decode(token);
    
    //       req.userId = decodedData?.sub;
    //     }    
    
    //     next();
    //   } 
//   const token = res.setHeader("Access-Control-Allow-Headers", "x-access-token, mytoken");

// const authHeader = req.headers['authorization']




const token =req.header("x-auth-token")
console.log(token)
  if (!token) {
    return res.status(401).json({ error: "No Token Sent" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.user;
    next();
  } 
catch (err) {
    res.status(401).json({ msg: "invalid Token" });
  }
};
