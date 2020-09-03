const  Gamer = require('../models/gamer');
const Game = require('../models/game');

module.exports = {
    addGame,
    addProgress,
    editProgress,
    index,
    delete:deleteGame,
    update
}

function update(req,res){
    Gamer.findById(req.user, function(err, gamer){
        gamer.backlog[req.params.idx].progress = req.body.progress;
        gamer.save(function(err){
            res.redirect(`/games/${req.params.id}`);
        })
    })
}
function deleteGame(req,res){
    let gameIdx = -1;
    Gamer.findById(req.user, function(err, gamer){
        gamer.backlog.forEach(function(backlogs, idx){
            gameIdx = backlogs.games.indexOf(req.params.id);
            if(gameIdx != -1){
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

function editProgress(req,res){
    let gameIdx = -1;
    let progressIdx = 'invalid';
    Gamer.findById(req.user, function(err, gamer){
        gamer.backlog.forEach(function(backlogs, idx){
            gameIdx = backlogs.games.indexOf(req.params.id);
            if(gameIdx != -1){
                progressIdx = idx;
            }
        })
    })
    Gamer.findById(req.user, function(err, gamer){
        console.log(progressIdx);
        if(progressIdx ==='invalid') res.redirect(`games/${req.params.id}`);
        let progress = gamer.backlog[progressIdx];
        let id = req.params.id
        res.render('gamers/edit', {title:"Progress", progress, progressIdx, id });
    })
}

function addProgress(req,res,next){
    let user = req.user;
    let backlogIdx = -1;
    user.backlog.forEach(function(backlogs){
       backlogIdx = backlogs.games.indexOf(req.params.id);
       if(backlogIdx != -1){
        backlogs.progress = req.body.progress;
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
            res.redirect(`/games/${req.params.id}`);
        })
      });
}