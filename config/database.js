//Require mongoose module
const mongoose = require("mongoose");

//Connect mongoose database to flights

mongoose.connect("mongodb://localhost/videogames",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

