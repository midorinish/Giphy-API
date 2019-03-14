$(document).ready(function() {
  var sciStuff = [
    "Star Trek",
    "Comet",
    "Star",
    "Constellation",
    "Astrology",
    "Battlestar Galactica",
    "Galaxy",
    "Asteroid",
    "Star Wars",
    "Satellite",
    "Killer Clowns from Outer Space",
    "Solar Flare",
    "Light Year",
    "Black Hole",
    "Lost in Space"
  ];
  var sciImage = "";

  function showButtons() {
    $("#buttonItems").empty();
    $("#sci-input").val("");
    for (var i = 0; i < sciStuff.length; i++) {
      var button = $("<button class='btn btn-primary'>");
      button.addClass("sci");
      button.attr("sci-name", sciStuff[i]);
      button.text(sciStuff[i]);
      $("#buttonItems").append(button);
      $("#buttonItems").append(" ");
    }
  }

  showButtons();

  $("#addSciThing").on("click", function(event) {
    $("#entry").empty();
    event.preventDefault();
    var sciInput = $("#sci-input")
      .val()
      .trim();
    var sciTerm = $(this).attr("sci-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      sciInput +
      "&limit=2&api_key=dc6zaTOxFJmzC";
    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
      if (response.pagination.total_count >= 10) {
        sciStuff.push(sciInput);
        showButtons();
      } else if (response.pagination.total_count === 0) {
        $("#entry").html(
          " Sorry, there were no results for this.  Please try again."
        );
      } else if (response.pagination.total_count === 1) {
        $("#entry").html(
          " Sorry, there was only 1 result for this.  Please try again."
        );
      } else {
        $("#entry").html(
          " Sorry, there were only " +
            response.pagination.total_count +
            " results for this.  Please try again."
        );
      }
      $("#sci-input").val("");
    });
  });
  $(document).on("click", ".sci", display);
  function display() {
    $("#entry").empty();
    var sciTerm = $(this).attr("sci-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      sciTerm +
      "&limit=10&api_key=veYcGHKW2Hf9G85vdePSRwi8PmNJmeyD";
    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
      for (var j = 0; j < response.data.length; j++) {
        var active = response.data[j].images.fixed_width.url;

        var still = response.data[j].images.fixed_width_still.url;
        var rating = "Rating: " + response.data[j].rating.toUpperCase();

        var sciImage = $("<img>");

        $("#ratings").css("color", "green");

        var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
        $(ratingDiv).css({
          "text-align": "center",
          "font-size": "20px",
          width: "200",
          display: "block"
        });
        sciImage.attr({
          active: active,
          still: still,
          src: still,
          state: "still"
        });

        var ratingAndImage = $("<div>");
        $(ratingAndImage).css({ float: "left" });
        $(ratingAndImage).prepend(ratingDiv, sciImage);

        $("#ratings").prepend(ratingAndImage);

        $(sciImage).on("click", function(event) {
          $("#entry").empty();

          var state = $(this).attr("state");
          var source = $(this).attr("src");
          if (state === "still") {
            $(this).attr("src", $(this).attr("active"));
            $(this).attr("state", "active");
          } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
          }
        });
      }
    });
  }
});
