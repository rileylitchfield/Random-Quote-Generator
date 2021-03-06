var quoteText = "Loading...";
var quoteAuthor = "";
var colorOne = "red";
var colorTwo = "red";

document.getElementById("text").innerHTML = quoteText;
document.getElementById("author").innerHTML = quoteAuthor;

const backgroundColors = ["blue", "green", "purple", "orange", "red", "brown"];

function changeColors() {
    var randNum = Math.floor(Math.random() * backgroundColors.length);
    colorOne = backgroundColors[randNum];
    //   Prevent the same color from occuring twice in a row
    if (colorTwo !== colorOne) {
        $(".container-fluid,.btn").css("background-color", colorOne);
        $("#text,#author,.fab").css("color", colorOne);
    } else {
        changeColors();
    }
    colorTwo = colorOne;
}

function loadQuote() {
    setTimeout(function () {
        $.ajax({
            url: 'https://quotable.io/random',
            dataType: "json",
            success: function (data) {
                if(data["length"] > 120) {
                    loadQuote();
                } else {
                    changeColors();

                    $("#twitter-icon").addClass("fa-twitter-square");

                    quoteText = '"' + data["content"] + '"';
                    $("#text").html(quoteText);
                    quoteAuthor = data["author"];
                    $("#author").html(quoteAuthor);

                    $("h2,h4,.btn,.fab").fadeIn(500);

                    var quoteSplitStr = quoteText.split(" ");
                    var quoteUrlString = quoteSplitStr.join("%20");
                    var authorSplitStr = quoteAuthor.split(" ");
                    var authorUrlString = authorSplitStr.join("%20");

                    var twitterURL = "https://twitter.com/intent/tweet?text=";
                    var result = twitterURL + quoteUrlString + " -" + authorUrlString;
                    $("a").attr("href", result);
                }
            }
        });
    }, 500);
}

$("#new-quote").click(function () {
    $("h2,h4,.btn,.fab").fadeOut(500);

    loadQuote();
});

loadQuote();
