const chatroom = require('express').Router();
const passport = require('passport');

const Chatroom = require('../../db').model('chatroom');

passport.serializeUser((chatroom, done) => {
  try {
    done(null, chatroom.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  Chatroom.findById(id)
    .then(chatroom => done(null, chatroom))
    .catch(done);
});

chatroom.get('/rooms', (req, res, next) => {
  Chatroom.findAll()
  .then((chatrooms) => {
    res.json(chatrooms)
  })
  .catch(error => console.error(error))
})

chatroom.post('/create', (req, res, next) => {
  Chatroom.create(req.body)
  .then(chatroom => {
      res.json(chatroom)
  })
    .catch(next);
});

chatroom.delete('/', (req, res, next) => {
  Chatroom.findOne({
      where: {
          name: req.body.name
      }
  })
  .then((chatroom) => {
      chatroom.destroy()
  })
  .then(() => {
      res.json("Chatroom Deleted")
  })
    .catch(next);
});

module.exports = chatroom;