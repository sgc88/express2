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

app.get("/todos/:id", function(req, res){
  res.sendFile("views/todo.html", {root: __dirname});
});

app.get('/todos/:id/edit', function(req, res){
  res.sendFile('views/editTodo.html', {root: __dirname});
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

//put route to edit single todoTarget
app.put('/api/todos/:id', function(req, res){
  //go to the db and find todo by using findById
  db.Todo.findById({_id:req.params.id}, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      //set the properties of the original Todo to the new values(from the form)
      result.author = req.body.author;
      result.description = req.body.description;
      result.difficultyLevel = req.body.difficultyLevel;
      //save the updated todo to the db
      result.save(function(err, updatedItem){
        if(err){
          console.log(err);
        }else{
          console.log(updatedItem);
          //send the updated Todo to the client(res.json)
          res.json(updatedItem);
        }
      });
    }
  });
});


app.delete('/api/todos/:id', function(req, res){
  db.Todo.findOneAndRemove({_id:req.params.id}, function(err, result){
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  });
});

app.post("/api/createTodo", function(req, res){
  console.log("req.body");
  var auth = req.body.author;
  var desc = req.body.description;
  var diff = req.body.difficultyLevel;

  var newTodo = new db.Todo({
    author: auth,
    description: desc,
    difficultyLevel: diff
  });

  newTodo.save(function(error, savedTodo){
    if(error){
      console.log(error);
    }else{
      res.json(savedTodo);
    }
  });
});

//Get route for a single todo

app.get("/api/todos/:id", function(req,res){
  db.Todo.findById({_id:req.params.id}, function(error, todo){
    if(error){
      console.log(error);
    }else{
      res.json(todo);
    }
  });
});


//telling what port our express applicationis listening to/connected
app.listen(3000, function(){
  console.log("listening 3000...");
});
