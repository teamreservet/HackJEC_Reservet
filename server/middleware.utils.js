const jwt = require('jsonwebtoken');
const User = require('./model/user');

module.exports.adminAuthMiddleware = (req, res, next) => {
  const jwtToken = req.headers['x-api-authentication'];
  jwt.verify(jwtToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.status(501).send('You are not authenticated');
    } else {
      const user = await User.findOne({ uid: decoded.uid });
      if (user.isAdmin) {
        next();
      } else {
        res.status(501).send('You are not authorized to upload monuments');
      }
    }
  });
};

module.exports.isLoggedIn = (req, res, next) => {
  const jwtToken = req.headers['x-api-authentication'];
  jwt.verify(jwtToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.status(501).send('You are not authenticated');
    } else {
      const user = await User.findOne({ uid: decoded.uid });
      req.currentUser = user;
      next();
    }
  });
};
