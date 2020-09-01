var express = require('express');
var router = express.Router();

const developersCtrl = require('../controllers/developers')

router.get('/new', developersCtrl.new);
router.post('/gamess/:id/developers', developersCtrl.addToGame);
router.post('/', developersCtrl.create);


module.exports = router;