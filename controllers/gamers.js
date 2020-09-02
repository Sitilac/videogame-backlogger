const  Gamer = require('../models/gamer');
const Game = require('../models/game');

module.exports = {
    addGame,
    addProgress,
    editBacklog,
    show
}
function show(req,res){
    Gamer.findById(req.user)
    .populate("games")
    .exec(function(err, gamer){

    });
}

function editBacklog(req,res){
    Gamer.findById(req.user)
    .exec(function(err, gamer){
        console.log(gamer.backlog)
    });
}

function addProgress(req,res,next){
    let user = req.user;
    let backlogIdx = -1;
    user.backlog.forEach(function(backlogs){
       backlogIdx = backlogs.games.indexOf(req.params.id);
       if(backlogIdx != -1){
        backlogs.progress.push(req.body.progress);
        req.user.save(function(err){
        })
        backlogIdx = 0;
       }
    })
    res.redirect('/games');
      
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