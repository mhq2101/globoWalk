const router = require('express').Router();

// matches GET requests to /api/locations/
router.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/locations/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/locations/:locationId
router.put('/:locationId', function (req, res, next) { /* etc */});
// matches DELTE requests to /api/locations/:locationId
router.delete('/:locationId', function (req, res, next) { /* etc */});

module.exports = router;