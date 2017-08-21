const User = require('./user');
const Chatroom = require('./chatroom');


User.belongsToMany(Chatroom, {through: "User_Prev_Chatrooms"})

module.exports = {Chatroom, User};