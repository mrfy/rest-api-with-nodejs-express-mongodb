const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("🚀 ~ file: checkAuth.js ~ line 6 ~ token", token);

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("🚀 ~ file: checkAuth.js ~ line 9 ~ decoded", decoded);
    res.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
};
