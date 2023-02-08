const router = require('express').Router();
const passport = require('passport');
const config = require('../config');
const CLIENT_HOME_PAGE_URL = config.nodeEnv === 'production' ? 'http://localhost:8000' : 'http://localhost:3000';
const CLIENT_GROUPS_PAGE_URL = config.nodeEnv === 'production' ? 'http://localhost:8000/groups' : 'http://localhost:3000/groups';

require('./../auth.js');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  '/google',
  passport.authenticate('google', {
    accessType: 'offline',
    scope: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  })
);

router.get('/google/success', isLoggedIn, (req, res) => {
  if (req.user) {
    res.redirect(CLIENT_GROUPS_PAGE_URL);
  }
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_HOME_PAGE_URL);
  });
});

router.get('/google/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

module.exports = router;
