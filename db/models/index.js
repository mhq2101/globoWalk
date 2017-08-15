const Chatroom = require('./chatroom');
const User = require('./user');
const Session = require('./session');


Session.belongsTo(User);
User.hasOne(Session);

module.exports = {Chatroom, User, Session};