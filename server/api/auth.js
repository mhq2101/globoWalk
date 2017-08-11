const auth = require('express').Router();
const passport = require('passport');

const User = require('../../db').model('user');

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

auth.get('/users', (req, res, next) => {
  User.findAll()
  .then((users) => {
    console.log("asdasd")
    res.json(users)
  })
  .catch(error => console.error(error))
})

auth.get('/me', (req, res, next) => {
  res.json(req.user);
});

auth.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

auth.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

auth.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = auth;