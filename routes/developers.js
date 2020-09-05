var express = require('express');
var router = express.Router();

const developersCtrl = require('../controllers/developers')

router.get('/developers', developersCtrl.index);
router.get('/developers/new',isLoggedIn, developersCtrl.new);
router.post('/developers',isLoggedIn, developersCtrl.create);
router.post('/games/:id/developers', developersCtrl.addToGame);
router.get('/developers/:id', developersCtrl.show);

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;

