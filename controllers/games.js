const Game = require("../models/game");
const Developer = require("../models/developer");

module.exports = {
  index,
  show,
  new: newGame,
  create,
};

function create(req, res) {
  const game = new Game(req.body);
  console.log(req.body)
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
    Game.find({}, function (err, games) {
        res.render("games/index", { title: "Games Database", games });
      });
}

function show(req, res) {
    Game.findById(req.params.id)
    .populate("developer")
    .exec(function (err, game) {
        Developer.find({ _id: { $nin: game.developer } }, function (err, developers) {
          res.render("games/show", { title: "Game Detail", game, developers });
        });
      });
}
