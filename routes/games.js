var express = require('express');
var router = express.Router();
const request = require('request');

const rootURL = "api.rawg.io/api"

const gamesCtrl = require('../controllers/games')

router.get('/', gamesCtrl.index);

module.exports = router;