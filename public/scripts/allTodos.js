console.log("allTodos.js is running ...");

//define global var
var $todosList;
var allTodos;


$(document).ready(function(){
  //setting todosList global var to the empty <div> in the view
  $todosList= $("#todoTarget");
  //on page load when document is ready
  //we need to send an ajax request to server
  //to get all todos from the db
  console.log("testing jquery");
  $.ajax({
    method : "GET",
    url : "/api/todos",
    success : onSuccess,
    error : onError
  });
});

//define the onSuccess function
function onSuccess(response){
  //setting server response to global var allTodos
  allTodos = response;
  //calling render() function, which displays the todos into the view
  render();
  //logging the response from the server
  console.log(response);
}

//define the onError function
function onError(error){
  console.log(error);
}

//define the render function

function render(){
  //will remove all wxisting todos in the todoTarget <div>
  $todosList.empty();
  //define a var that contains all the todos
  //and each todo has been formated for html output
  var todosHtml = getAllTodosHtml(allTodos);
  //appending todos with html output to the view
  $todosList.append(todosHtml);
}

//define getAllTodosHtml() function
function getAllTodosHtml(items){
  //this function will take each todo and run the getTodoHtml function on it
  return items.map(getTodoHtml).join("");
}

//define getTodoHtml() function

function getTodoHtml(item){
  //this function will return the html output for a single item
  return`
  <hr>
  <p>
    <b>${item.description}</b>
    by ${item.author}
    (<i>Difficulty: ${item.difficultyLevel}</i>)
  </p>
  `;
}
