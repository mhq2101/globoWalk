const Chatroom = require('./chatroom');
const User = require('./user');

Chatroom.belongsToMany(User, {through: "Chatroom_User"})

module.exports = {Chatroom, User};