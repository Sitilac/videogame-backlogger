const Game = require("../models/game");
const Developer = require("../models/developer");
const Gamer = require("../models/gamer");

module.exports = {
  index,
  show,
  new: newGame,
  create,
};


function create(req, res) {
  if(req.body.title === "" || req.body.released ===""){
    res.redirect("/games/new");
    return;
  }
  const game = new Game(req.body);
  res.redirect("/games");
  game.save(function (err) {
    if (err) return res.render("games/new");

  });
}

function newGame(req, res) {
  res.render("games/new", { title: "Add Game" });
}

function index(req, res) {
let sortKey = req.query.sort || 'title';
  Game.find({})
  .sort(sortKey)
  .exec(function (err, games) {
      res.render("games/index", { title: "Games Database", games});
    });
  }


function show(req, res) {
    let noDev = false;
    Game.findById(req.params.id)
    .populate("developer")
    .exec(function (err, game) {
    if(typeof(game.developer) === "undefined"){

        noDev = true;
    }
      Developer.find({ _id: { $nin: game.developer } }, function (err,developers) {
        Gamer.findById(req.user).populate('game').exec(function (err, gamer) {
          let isIncluded = false;
          if (gamer != null) {
            gamer.backlog.forEach(function (backlogs) {
              if (backlogs.games.includes(req.params.id)) {
                isIncluded = true;
              }
            });
          }
          res.render("games/show", {
            title: "Game Details",
            game,
            developers,
            gamer,
            isIncluded,
            noDev
          });
        });
      });
    });
}
