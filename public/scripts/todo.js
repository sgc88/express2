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
    </div>
  `;
  $("#todoTarget").append(output);
}

function onError(error){
  console.log(error);
}
