const auth = require('express').Router();
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
    res.json(users)
  })
  .catch(error => console.error(error))
})

//OAuth Google
auth.get('/google/login', 
  passport.authenticate('google', {
    scope: 'email'
  })
);

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
passport.use(
  new GoogleStrategy(googleConfig, 
    function (token, refreshToken, profile, done) {
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;

  User.findOne({where: { googleId: googleId  }})
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, googleId })
          .then(function (user) {
            done(null, user);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
  })
);

//OAuth Google Callback - handle the callback after Google has authenticated the user
auth.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/user',
    failureRedirect: '/login'
  })
);

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
          else {
            //req.session.user = user
            res.json(user)
          }
        });
      }
    })
    .catch(next);
});

auth.post('/logout', (req, res, next) => {
  req.logout();
  //res.redirect('/login')
  res.sendStatus(200);
});

auth.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = auth;