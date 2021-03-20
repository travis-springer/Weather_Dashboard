//var searchCity = document.getElementById("search_city");
// var searchButton = document.getElementById("search_button");
var searchHistory = document.getElementById("search_history");
//var searchClear = document.getElementById("search_clear");
var cityName = document.getElementById("city_name");
var cityImg = document.getElementById("city_img");
var cityTemperature = document.getElementById("city_temperature");
var cityHumidity = document.getElementById("city_humidity");
var cityWind = document.getElementById("city_wind");
var cityUV = document.getElementById("city_UV");

var searchStorage = [];

//API Key from openweathermap.com
var APIKey = "acd65b4cc0421391f7342feb506c6e96";



function showHistory() {
    if (localStorage.getItem("Search History") == null) {
        $("#searchHistory").empty();
    } else {
        $("#searchHistory").empty();
        searchStorage = JSON.parse(localStorage.getItem("Search History"));
        searchStorage.forEach(function(item){
            var historyItem = $("<h4>").text(item);
            $("#searchHistory").append(historyItem);
        })
    }
}

//Search Button
$("#searchButton").on("click", function () {
    var searchCity = $("#searchCity").val();
    searchStorage.push(searchCity);
    localStorage.setItem("Search History", JSON.stringify(searchStorage));
    showHistory();
})

//Clear Search History Button
$("#searchClear").on("click", function () {
    localStorage.removeItem("Search History");
    showHistory();
})

showHistory();