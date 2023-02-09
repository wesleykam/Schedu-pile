const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const authRoutes = require('./routes/auth-routes');
const groupRoutes = require('./routes/groups');
const userRoutes = require('./routes/users');
const keys = require('./config/keys');
const config = require('./config');

const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
  cors({
    origin: config.nodeEnv === 'production' ? 'https://project-t10-schedulecompiler.herokuapp.com' : 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/group', groupRoutes);

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

app.get('/check', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies,
  });
});

if(config.nodeEnv === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, '/../frontend/build')))

  // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  })
}

mongoose.set("strictQuery", true);

mongoose.connect(config.mongoURI)
    .then(() => { 
        app.listen(config.port, () => {
            console.log('connected to db & listening on port', config.port)
        })
    })
    .catch((error) => {
        console.log(error)
    })