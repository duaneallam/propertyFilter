var express = require('express');
var router = express.Router();
var hometrack = require('../includes/hometrack.js');

/* GET home page. */
router.post('/filter', [
	hometrack.filter
]);

module.exports = router;
