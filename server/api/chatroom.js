const chatroom = require('express').Router();
const passport = require('passport');

const User = require('../../db').model('user');
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

chatroom.get('/room/:id', (req, res, next) => {
  console.log("hello")
  Chatroom.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(chatroom => {
    console.log("asdasd")
    res.json(chatroom)
  })
  .catch(next)
})

chatroom.post('/create', (req, res, next) => {
  Chatroom.create(req.body)
  .then(chatroom => {
    res.json(chatroom)
  })
    .catch(next);
});

chatroom.post('/joinRoom', (req, res, next) => {
  //const userPromise = User.findById(req.user.id)
  const userPromise = User.findById('1')
  const chatroomPromise = Chatroom.findOne({where: {name: req.body.name}})
  Promise.all([userPromise, chatroomPromise])
    .then((promises) => {
      const user = promises[0]
      const chatroom = promises[1]
      chatroom.addUser(user.id)
      res.json("user added to chatroom")
    })
})

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