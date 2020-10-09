const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
}

async function signin(req, res) {
  res.send({ token: tokenForUser(req.user) });
}

async function signup(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  } catch (err) {
    return next(err);
  }

  const user = new User({ email, password });
  try {
    await user.save();
    return res.status(201).json({ token: tokenForUser(user) });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signin, signup };
