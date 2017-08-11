const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const volleyball = require('volleyball');

const db = require('../db')
const session = require('express-session');

const passport = require('passport');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

//error logging middleware?
app.use(volleyball);

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false,
  saveUninitialized: false
}));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

//serve static files
app.use(express.static(path.join(__dirname, '../public')));

//routes
app.use('/api', require('./api'));

// Send index.html for anything else
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(2001, function () {
  console.log("Your server, listening on port 2001");
})

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});