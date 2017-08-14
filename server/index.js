const path = require('path');
const chalk = require('chalk');
const http = require('http');
const server = http.createServer();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const volleyball = require('volleyball');


// const forceSSL = function (req, res, next) {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     const clientIP = req.headers['x-forwarded-for'];
//     const redirectTarget = ['https://', req.get('Host'), req.url].join('');
//     console.log(chalk.blue(`Redirecting ${clientIP} to ${redirectTarget}`));
//     return res.redirect(redirectTarget);
//   }
//   return next();
// };

// if (process.env.NODE_ENV === 'production') {
//   console.log(chalk.blue('Production Environment detected, so redirect to HTTPS'));
//   app.use(forceSSL);
// }



const db = require('../db')
const session = require('express-session');

const passport = require('passport');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

if (process.env.NODE_ENV !== 'production') {
  require('../localSecrets'); // this will mutate the process.env object with your secrets.
}

// sync so that our session table gets created
dbStore.sync();

//error logging middleware?
app.use(volleyball);

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting up socket.io
const socketio = require('socket.io');
server.on('request', app);
const io = socketio(server);
require('./socket')(io);

//serve static files
app.use(express.static(path.join(__dirname, '../public')));

//routes
app.use('/api', require('./api'));

// Send index.html for anything else
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
const port = process.env.PORT || 1337;

server.listen(port, () => {
  console.log(chalk.blue(`--- Listening on port ${port} ---`));
});


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});