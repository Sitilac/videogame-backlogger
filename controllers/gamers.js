const  Gamer = require('../models/gamer');
const Game = require('../models/game');

module.exports = {
    addGame,
    addProgress,
    editBacklog,
    index,
    delete:deleteGame
}
function deleteGame(req,res){
    let gameIdx = -1;
    Gamer.findById(req.user, function(err, gamer){
        gamer.backlog.forEach(function(backlogs, idx){
            gameIdx = backlogs.games.indexOf(req.params.id);
            if(gameIdx != -1){
                console.log(gamer.backlog[idx]);
                gamer.backlog.splice(idx, 1);
                gamer.save(function(err){
                    console.log("Working");
                })
            }
        })
    })
    res.redirect(`/games/${req.params.id}`)
}
function index(req,res){
    Gamer.findById(req.user)
    .populate({
        path: 'backlog.games',
        model: 'Game'})
    .exec(function(err, games){
        res.render('gamers/index', {title:"Backlog", games});
    })
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