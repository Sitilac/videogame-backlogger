var express = require('express');
var router = express.Router();
const gamersCtrl = require('../controllers/gamers');

router.post('/games/:id/gamers', gamersCtrl.addGame);
router.post('/games/:id/progress', gamersCtrl.addProgress);




module.exports = router;
