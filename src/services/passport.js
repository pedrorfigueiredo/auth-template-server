const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const config = require('../config');

const localOptions = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      return user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err, false);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    } catch (err) {
      return done(err, false);
    }
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
