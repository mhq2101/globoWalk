const Chatroom = require('./chatroom');
const User = require('./user');
const Session = require('./session');


Session.belongsTo(User);
User.hasOne(Session);

Chatroom.belongsToMany(User, {through: "Chatroom_User"})

module.exports = {Chatroom, User, Session};