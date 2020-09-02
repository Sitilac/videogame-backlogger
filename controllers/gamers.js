const  Gamer = require('../models/gamer');
const Game = require('../models/game');

module.exports = {
    addGame,
}

function addGame(req,res, next){
    Game.findById(req.params.id)
    .exec(function (err, game) {
        req.user.backlog.push({games: game});
        req.user.save(function(err){
            res.redirect('/games');
        })
      });
}