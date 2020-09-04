const Developer = require("../models/developer");
const Game = require("../models/game");

module.exports = {
  new: newDeveloper,
  create,
  addToGame,
  index,
  show
};

function show(req,res){
    let sortKey = req.query.sort || 'games.title';
    Developer.findById(req.params.id)
    .populate('games')
    .sort(sortKey)
    .exec(function (err,developers){
        console.log(developers);
        res.render('developers/show', {title: "Developer games", developers});
    })
}
function index(req,res){
  let sortKey = req.query.sort || 'studio';
  Developer.find({})
  .sort(sortKey)
  .exec(function (err, developer) {
      res.render("developers/index", { title: "Developer Database", developer});
});
}
function addToGame(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(typeof(req.body.developerId) === "undefined"){
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
  if(req.body.studio === "" || req.body.director === ""){
    res.redirect('/developers/new');
    return;
  }
  const developer = Developer(req.body);
  res.redirect("/games");
  developer.save(function (err) {
    if (err) return res.render("developers/new");
  });
}
