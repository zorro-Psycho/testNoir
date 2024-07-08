
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = user.id;
    next();
  });
};

module.exports = authenticateToken;




