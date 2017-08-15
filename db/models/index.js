const Chatroom = require('./chatroom');
const User = require('./user');
const Session = require('./session');


Session.belongsTo(User);
User.hasOne(Session);

User.belongsToMany(Chatroom, {through: 'User_Chatrooms'})
Chatroom.belongsToMany(User, {through: 'Chatroom_Users'})

module.exports = {Chatroom, User, Session};