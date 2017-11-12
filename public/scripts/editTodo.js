console.log("testing editTodo...");


var windowPath = window.location.pathname;
var windowPathSplit = windowPath.split('/');
var id = windowPathSplit[2];
var url = '/api/todos' + id;

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: url,
    success: onSuccess,
    error: onError
  });
});

function onSuccess(result){
  var output= `
  <form id="editTodoForm">
    <div class="form-group">
      <label for="description">Description</label>
      <input type="text" class="form-control" name="description" value="${result.description}">
    </div>
    <div class="form-group">
      <label for="difficultyLevel">Difficulty</label>
      <input type="text" class="form-control" name="difficultyLevel" value="${result.difficultyLevel}">
    </div>
    <div class="form-group">
      <label for="author">Author</label>
      <input type="text" class="form-control" name="author"value="${result.author}">
    </div>
    <button onclick="editCancel()" class="btn btn-danger">Cancel</button>
    <button onclick="editSave()" class="btn btn-successt">Save</button>
  </form>


  `;
  $("#todoTarget").append(output);
}

function editCancel(){
  window.location.href = '/todos/' + id;
}

function editSave(){
  $.ajax({
    method: "PUT",
    url: url,
    data: $("form").serialize(),
    success: onSave,
    error: onError
    });
}

function onSave(result){
  console.log(result);
}

function onError(error){
  console.log(error);
}
