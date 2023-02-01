const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth-routes');
const keys = require('./config/keys');

const port = 8000;

const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated',
    });
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/check', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies,
  });
});

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.listen(port, () => console.log('listening on port:', port));
