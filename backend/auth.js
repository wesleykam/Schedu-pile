const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const mongoose = require('mongoose');
const User = require('./models/userModel');

const config = require('./config');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackURL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName,
        refreshToken: refreshToken
      }

      // store user data in mondoDB if user does not exist
      // TO DO: if new refresh token is different from the one stored in DB, update it
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          if (refreshToken && user.refreshToken != refreshToken) {
            const response = await User.findOneAndUpdate({ googleId: profile.id }, {
              refreshToken: refreshToken
            });
          }
          return done(null, profile);
        } else {
          user = await User.create(newUser);
          return done(null, profile);
        }
      } catch (err) {
        console.error(err);
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
