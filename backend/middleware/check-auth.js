const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(req.headers.authorization);
    const deccodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: deccodedToken.email, userId: deccodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated",
    });
  }
};
