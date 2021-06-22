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

  try {
    const token = req.headers.authorization.split("")[1];
    const googleToken = token.length < 500;

    let decodeData;
    if (token && googleToken) {
      decodeData = jwt.verify(token, process.env.JWT_KEY);
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    console.log(req.userId)
    next();
  } catch (err) {
    console.log("middleware", err);
    res.status(401).json({ msg: "invalid Token" });
  }
};
