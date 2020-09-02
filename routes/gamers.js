var express = require('express');
var router = express.Router();
const gamersCtrl = require('../controllers/gamers');

router.get('/gamers', gamersCtrl.index);
router.post('/games/:id/gamers', gamersCtrl.addGame);
router.post('/games/:id/progress', gamersCtrl.addProgress);
router.put('/games/:id', gamersCtrl.editBacklog);




module.exports = router;
