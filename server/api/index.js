const router = require('express').Router();

router.use('/auth', require('./auth')) // matches all requests to  /api/auth/
router.use('/chatroom', require('./chatroom')) // matches all requests to  /api/chatroom/
//router.use('/locations', require('./locations')); // matches all requests to  /api/locations/


//Not Found 404
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;