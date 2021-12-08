function searchMovie() {

  $("#movie-list").html("");

  // pakai $.ajax()
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get", 
    dataType: "json", 
    data: {
      
      apikey: "d8c23a72",
      s: $("#search-input").val(),
    },
    success: function (result) {

      const results = result.Search;

      if (result.Response == "True") {
        

        $.each(results, function (key, value) {
          
          $("#movie-list").append(
            `
          <div class="col-md-4 mb-3">
              <div class="card">
              <img src="` +
              value.Poster +
              `" class="card-img-top">
                  <div class="card-body">
                      <h5 class="card-title">` +
              value.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` +
              value.Year +
              `</h6>
              <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` +
              value.imdbID +
              `">See Detail</a>
                  </div>
              </div>
          </div>
          `
          );
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `
          <div class="col">
            <h1 class="text-center">` +
            result.Error +
            `</h1>
          </div>
        `
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (event) {
 
  if (event.keyCode === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "d8c23a72",
      i: $(this).data("id"),
    },
    success: function (result) {
      if (result.Response === "True") {
        $(".modal-body").html(
          `
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="` +
            result.Poster +
            `" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>` +
            result.Title +
            `</h3></li>
                  <li class="list-group-item">Released : ` +
            result.Released +
            `</li>
            <li class="list-group-item">Genre : ` +
            result.Genre +
            `</li>
            <li class="list-group-item">Director : ` +
            result.Director +
            `</li>
            <li class="list-group-item">Actors : ` +
            result.Actors +
            `</li>
                </ul>
              </div>
            </div>
          </div>
        `
        );
      }
    },
  });
});
