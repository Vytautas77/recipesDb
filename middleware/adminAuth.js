const jwt = require("jsonwebtoken");
const authenticationAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization_admin;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Bad auth" });
      }
      req.body.adminId = decoded.adminId;
      return next();
    });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

module.exports = authenticationAdmin;
