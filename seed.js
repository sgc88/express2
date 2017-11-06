//require models folder cuz we are using Todo model
//and we need to make a connection to the db
var db = require("./models");

//create array of objects, that will be example todos
var todo_list = [
  {
    author: "John",
    description: "Take Max to park",
    difficultyLevel:3
  },
  {
    author: "Shirin",
    description: "do homework",
    difficultyLevel: 5
  },
  {
    author: "George",
    description: "go to school",
    difficultyLevel: 1
  },
  {
    author: "Mom",
    description: "get haircut",
    difficultyLevel: 2
  },
  {
    author: "Ama",
    description: "take a walk in am",
    difficultyLevel: 5
  },
  {
    author: "Scott",
    description: "Watch tv",
    difficultyLevel: 4
  },
  {
    author: "Uro",
    description: "go to work",
    difficultyLevel: 4
  }
];

//remove all existing todos from the db
db.Todo.remove({}, function(error, todos){
  //check for an error when deleting todos from db
  if (error){
    console.log(error);
  }else{
    //log to the console that deleting todos is successfull
    console.log("removed all todos from db...");
    //create todos from todos_list
    db.Todo.create(todo_list, function(error, todos){
      //check foir an error when creating the todos
      if(error){
        console.log(error);
      }else{
        //log to the console number of todos that we successfuly created
        console.log("Created " + todos.length + " todos...");
        //speacila mongoose method to leave db cuz we are finished
        process.exit();

      }

    });

  }

});
