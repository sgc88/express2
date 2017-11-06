//requiring express module
var express = require("express");

//require body-parser
var bodyParser = require("body-parser");
//re2quiring the model folder wihich deals with DB
var db = require("./models");

//initiliazing a new express application
var app = express();

//express middleware ti serve static file in public folder
app.use(express.static(__dirname + "/public"));

//get route for root
app.get('/', function(req, res){
  //sending index.html as a response to the client
  res.sendFile("views/index.html", {root : __dirname});
});

//telling what port our express applicationis listening to/connected
app.listen(3000, function(){
  console.log("listening 3000...");
});
