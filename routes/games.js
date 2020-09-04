var express = require('express');
var router = express.Router();
const request = require('request');

const rootURL = "api.rawg.io/api"

const gamesCtrl = require('../controllers/games');
const { route } = require('.');

router.get('/', gamesCtrl.index);
router.get('/new', gamesCtrl.new);
router.get('/:id', gamesCtrl.show);
router.post('/', gamesCtrl.create);

module.exports = router;