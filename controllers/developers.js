const Developer = require('../models/developer');
const Game = require('../models/game');

module.exports = {
    new: newDeveloper,
    create,
    addToGame
}
function addToGame(req,res){
    Game.findById(req.params.id, function(err, game){
      game.developer.push(req.body.performerId);
      game.save(function(err){
        res.redirect(`/games/${game._id}`);
      });
    });
  }

function newDeveloper(req,res){
    res.render("developers/new", { title: "Add Developer" });
}

function create(req,res){
    const developer = Developer(req.body);
    res.redirect("/games");
    developer.save(function (err) {
        if (err) return res.render("developers/new");
        console.log(developer);
      });
}