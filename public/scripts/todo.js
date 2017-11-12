console.log("testin todo.js ...");

$(document).ready(function(){
  var windowPath = window.location.pathname;
  var windowPathSplit = windowPath.split("/");
  var id = windowPathSplit[2];
  var url = "/api/todos/" +id;

  console.log(id);
  console.log(url);

  $.ajax({
    method: "GET",
    url: url,
    success: onSuccess,
    error: onError
  });

  $("#todoTarget").on("click", ".delete-todo", function(event){
    console.log("clicked me");
    $.ajax({
      method: "DELETE",
      url: url,
      data: id,
      success: deleteSuccess,
      error: deleteError
    });
  });
  $("#todoTarget").on("click", ".edit-todo", function(event){
    console.log("testing...");
    window.location.href="/todos/" + id + "/edit";
  });
});

function onSuccess(response){
  var output=`
    <div>
        <p>
          <strong>Author: </strong> ${response.author}
        </p>
        <p>
          <strong>description: </strong> ${response.description}
        </p>
        <p>
          <strong>Difficulty: </strong> ${response.difficultyLevel}
        </p>
        <button class="btn btn-warning delete-todo todo" data-id="${response._id}">Delete</button>
        <button class="btn btn-success edit-todo todo" data-id="${response._id}">Edit</button>

    </div>
  `;
  $("#todoTarget").append(output);
}

function onError(error){
  console.log(error);
}

function deleteSuccess(json){
  window.location.href = "/todos"
}
function deleteError(error){
  concole.log(error);
}
