const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');

const name = (process.env.DATABASE_NAME || 'globoWalk' + (process.env.NODE_ENV === 'testing' ? '_test' : ''));
const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`;


const db = new Sequelize(url || 'postgres://localhost:5432:globoWalk', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});

module.exports = db;

require('./models')
 
// Sync the db, creating it if necessary
function sync (force = process.env.NODE_ENV === 'testing') {
 return db.sync({ force: false })
   .then(ok => console.log(chalk.blue(`Synced models to db ${url}`)))
   //.then(() => require('../server'))
   .catch(error => console.error(error))
}

db.didSync = sync();