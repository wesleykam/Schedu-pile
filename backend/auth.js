const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const mongoose = require('mongoose');
const User = require('./models/userModel');

require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        refreshToken: refreshToken
      }

      console.log(profile);

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          user = await User.create(newUser);
          return done(null, user);
        }
      }
      catch (err) {
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
