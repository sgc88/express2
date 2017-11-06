//requiring mongoose
var mongoose = require("mongoose");

//define a var schema that is set to mongoose.Schema
//to be used later when we want to create a new shcema
var Schema = mongoose.Schema;

//define our TodoSchema
var TodoSchema = new Schema({
  author : String,
  descrption : String,
  difficultyLevel : Number
});

//create our TodoModel and set that var Todo
var Todo = mongoose.model("Todo", TodoSchema);

//export the model to be used by other files
module.exports = Todo;
