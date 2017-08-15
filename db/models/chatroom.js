const Sequelize = require('sequelize');
const db = require('../index');
const crypto = require('crypto');
const _ = require('lodash');

const Chatroom = db.define('chatrooms', {
  name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

//Class Methods
Chatroom.generateSalt = function () {
      return crypto.randomBytes(16).toString('base64');
}

Chatroom.encryptPassword = function (plainText, salt) {
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
}

function setSaltAndPassword (chatroom) {
  if (chatroom.changed('password')) {
    chatroom.salt = Chatroom.generateSalt();
    chatroom.password = Chatroom.encryptPassword(chatroom.password, chatroom.salt);
  }
}


//Instance Methods
Chatroom.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
}

Chatroom.prototype.correctPassword = function (candidatePassword) {
    return Chatroom.encryptPassword(candidatePassword, this.salt) === this.password;
}

module.exports = Chatroom;