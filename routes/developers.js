var express = require('express');
var router = express.Router();

const developersCtrl = require('../controllers/developers')

router.get('/developers', developersCtrl.index);
router.get('/developers/new', developersCtrl.new);
router.post('/developers', developersCtrl.create);
router.post('/games/:id/developers', developersCtrl.addToGame);
router.get('/developers/:id', developersCtrl.show);


module.exports = router;