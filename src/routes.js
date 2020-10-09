const express = require('express');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();
const AuthController = require('./controllers/authController');

router.get('/', requireAuth, (req, res) => {
  res.status(200).send({ hi: 'there' });
});

router.post('/signin', requireSignin, AuthController.signin);
router.post('/signup', AuthController.signup);

module.exports = router;
