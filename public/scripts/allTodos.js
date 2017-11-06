console.log("allTodos.js is running ...");

$(document).ready(function(){
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
  //logging the response from the server
  console.log(response);
}

//define the onError function
function onError(error){
  console.log(error);
}
