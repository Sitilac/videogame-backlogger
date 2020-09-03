const Developer = require("../models/developer");
const Game = require("../models/game");

module.exports = {
  new: newDeveloper,
  create,
  addToGame,
};
function addToGame(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(typeof(req.body.developerId) === "undefined"){
        console.log("entered");
        res.redirect(`/games/${game._id}`);
        return;
    }
    game.developer = req.body.developerId;
    game.save(function (err) {});
    Developer.findById(req.body.developerId, function (err, developer) {
      developer.games.push(game._id);
      developer.save(function (err) {
        res.redirect(`/games/${game._id}`);
      });
    });
  });
}

function newDeveloper(req, res) {
  res.render("developers/new", { title: "Add Developer" });
}

function create(req, res) {
  const developer = Developer(req.body);
  res.redirect("/games");
  developer.save(function (err) {
    if (err) return res.render("developers/new");
  });
}
