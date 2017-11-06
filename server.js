//requiring express module
var express = require("express");

//require body-parser
var bodyParser = require("body-parser");
//requiring the model folder wihich deals with DB
var db = require("./models");

//initiliazing a new express application
var app = express();

//express middleware ti serve static file in public folder
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended : true}));

///////////////////
//HTML ENDPOINTS //
//////////////////


//get route for root
app.get('/', function(req, res){
  //sending index.html as a response to the client
  res.sendFile("views/index.html", {root : __dirname});
});

//get route for all todos
app.get("/todos", function(req, res){
  // send the allTodos.html file to the client
  res.sendFile("views/allTodos.html", {root : __dirname});
});

app.get("/createTodo", function(req, res){
  res.sendFile("views/createTodo.html", {root:__dirname});
});


//////////////////
//API ENDPOINTS//
/////////////////

//get routes for all todos
app.get("/api/todos", function(req, res){
  //go to the db, find all todos
  db.Todo.find({}, function(error, todos){
    //check for an error finding todos
    if(error){
      console.log(error);
    }else{
      // send the todos back to the client
      res.json(todos);
    }
  });
});

app.post("/api/createTodo", function(req, res){
  console.log("req.body");
});


//telling what port our express applicationis listening to/connected
app.listen(3000, function(){
  console.log("listening 3000...");
});
