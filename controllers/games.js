const request = require('request');
const gameURL = 'https://api.rawg.io/api/games?search=Katamari%20Damacy';

module.exports ={
    index,
}

function index(req,res){
    res.render('games/index', {title: "Games"});
    request(gameURL, function(err,res, games){
        const game = JSON.parse(games)
        // for(let i = 0; i < game.length; i++){
        //     if(game[i].name == "Devil May Cry 4"){
        //         console.log(game[i].name);
        //     }
        // }
        console.log(game);
    })
}