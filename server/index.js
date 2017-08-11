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

app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./apiRoutes'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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