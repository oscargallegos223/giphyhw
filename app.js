 

$( document ).ready(function() {

 

    var array = ["blobfish", "marlin", "squid", "dog", "cat", "snake", "rat","hamster","racoon","mule"];

   

    function displayGifButtons() {

        $("#gifButtonsView").empty();

        for (var i = 0; i < array.length; i++) {

            var gifButton = $("<button>");

            gifButton.addClass("animal");

            gifButton.attr("data-name", array[i]);

            gifButton.text(array[i]);

            $("#gifButtonsView").append(gifButton);

        }

    }

   

    function addNewButton() {

        $("#addGif").on("click", function() {

            var animal = $("#searchInput").val().trim();

            if (animal == ""){

                return false

            }

            array.push(animal);
            displayGifButtons();

            return false;

            });

    }
    

    function displayGifs() {

        var animal = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=9PiXsf8wcTGG0v5bwZc36JhUdZ9poBba";

       

        $.ajax({

            url: queryURL,

            method: 'GET'

        })

   

        .done(function(response) {

            $("#gifsView").empty();
            var results = response.data;

            for (var i = 0; i < 11; i++){

                var gifDiv = $("<div1>");

                var gifRating = $("<p>").text("Rating " + results[i].rating);

                gifDiv.append(gifRating);
                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);

                gifImage.attr("data-state", "still");

                gifImage.addClass("image");

                gifDiv.append(gifImage);

               

 

                $("#gifsView").prepend(gifDiv);

            }

        });

    }

    displayGifButtons();

    addNewButton();

 

    $(document).on("click", ".animal", displayGifs);

    $(document).on("click", ".image", function() {

        var state = $(this).attr('data-state');

        if (state == 'still') {

            $(this).attr('src', $(this).data('animate'));

            $(this).attr('data-state', 'animate');

        } else {

            $(this).attr('src', $(this).data('still'));

            $(this).attr('data-state', 'still');

        }

   

        });

   

    });