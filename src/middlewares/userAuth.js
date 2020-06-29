const User = require('../models/User');
const expressJwt = require('express-jwt');

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({
        error: 'No user was found in DB'
      });
    }

    req.profile = user;

    next();

  } catch (err) {

    return res.status(400).json({
      error: err
    });
  }
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth'
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.id == req.auth.id;

  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED'
    });
  }
  next();
};

