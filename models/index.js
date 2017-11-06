//requiring mongoose
var mongoose = require("mongoose");

//make a connection to mongo db
//we are using ""express1" db
mongoose.connect("mongodb://localhost/express1");

//define a var set to the db connection we just made
var db = mongoose.connection;

//create an event listener to listen for an error with db connection
db.on("error", function(err){
  console.log(err);
});

//listen for when the db connection is successfull
//when it is successfull, we will log that to the console
db.once("open", function(){
  console.log("db connection successfull...");
});

//import our Todo model

module.exports.Todo = require("./todo.js");
