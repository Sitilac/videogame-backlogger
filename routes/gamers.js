var express = require('express');
var router = express.Router();
const gamersCtrl = require('../controllers/gamers');

router.get('/gamers', gamersCtrl.index);
router.post('/games/:id/gamers', gamersCtrl.addGame);
router.post('/games/:id/progress', gamersCtrl.addProgress);
router.delete('/gamers/:id/', gamersCtrl.delete);
router.get('/games/:id/edit', gamersCtrl.editProgress);
router.put('/gamers/:id/:idx', gamersCtrl.update);




module.exports = router;
