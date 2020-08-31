const Game = require("../models/game");

module.exports = {
  index,
  show,
  new: newGame,
  create,
};

function create(req, res) {
  const game = new Game(req.body);
  res.redirect("/games");
  game.save(function (err) {
    if (err) return res.render("games/new");
    console.log(game);
  });
}

function newGame(req, res) {
  res.render("games/new", { title: "Add Game" });
}

function index(req, res) {
  res.render("games/index", { title: "Games" });
  request(gameURL, function (err, res, games) {
    const game = JSON.parse(games);
    console.log(game);
  });
}

function show(req, res) {}
