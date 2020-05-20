const jwt = require("jsonwentoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "some-random*long-string");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!",
    });
  }
};
