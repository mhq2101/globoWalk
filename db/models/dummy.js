const Sequelize = require('sequelize');
const db = require('../index')

const Dummy = db.define('dummy', {
  name: Sequelize.STRING
})

module.exports = Dummy;