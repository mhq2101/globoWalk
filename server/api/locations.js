const location = require('express').Router();

// matches GET requests to /api/locations/
location.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/locations/
location.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/locations/:locationId
location.put('/:locationId', function (req, res, next) { /* etc */});
// matches DELTE requests to /api/locations/:locationId
location.delete('/:locationId', function (req, res, next) { /* etc */});

module.exports = router;