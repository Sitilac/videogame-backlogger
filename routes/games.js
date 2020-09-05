var express = require('express');
var router = express.Router();
const request = require('request');

const rootURL = "api.rawg.io/api"

const gamesCtrl = require('../controllers/games');
const { route } = require('.');

router.get('/', gamesCtrl.index);
router.get('/new',isLoggedIn, gamesCtrl.new);
router.get('/:id', gamesCtrl.show);
router.post('/',isLoggedIn, gamesCtrl.create);

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}
module.exports = router;