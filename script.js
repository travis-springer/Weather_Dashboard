var searchStorage = [];

//API Key from openweathermap.com
var APIKey = "acd65b4cc0421391f7342feb506c6e96";

function getWeather(cityName) {
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
    axios.get(URL)
    .then(function(response) {
        console.log(response);
        var currentDate = new Date(response.data.dt*1000).toDateString();
        $("#cityName").text(`${response.data.name} - ${currentDate}`);
        var weatherIMG = response.data.weather[0].icon;
        $("#cityImg")
            .attr({"src": `https://openweathermap.org/img/wn/${weatherIMG}@2x.png`})
            .attr({"alt": response.data.weather[0].description});
        $("#cityTemp").text(`Temperature: ${kel2Far(response.data.main.temp)} F`);
        $("#cityHumidity").text(`Humidity: ${response.data.main.humidity}%`);
        $("#cityWind").text(`Wind: ${response.data.wind.speed} MPH`);
        var lat = response.data.coord.lat;
        var lon = response.data.coord.lon;
        var URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        axios.get(URL2)
        .then (function(response) {
            console.log(response);
            var uvIndex = response.data.current.uvi;
            $("#cityUV").text(`UV Index: `);
            $("#spanUV").text(uvIndex);
            if (uvIndex <= 2) {
                $("#spanUV").attr({"class": "badge badge-success"})
            } else if (uvIndex > 2 && uvIndex <= 4) {
                $("#spanUV").attr({"class": "badge badge-primary"})
            } else if (uvIndex > 4 && uvIndex <= 6) {
                $("#spanUV").attr({"class": "badge badge-warning"})
            } else {
                $("#spanUV").attr({"class": "badge badge-danger"})
            } 
            //Create forecast
            var fCasts = document.querySelectorAll(".forecast");
            var i = 1;
            console.log(fCasts);
            fCasts.forEach(function () {
                var fcastDate = new Date(response.data.daily[i].dt*1000).toDateString();
                console.log(fcastDate);
                var fCastDateEl = document.createElement("p");
                fCastDateEl.innterHTML = fcastDate;
                fCasts[i].append(fCastDateEl);
                i++;
            })
        })
        })
    }

function kel2Far (kel) {
    return Math.floor((kel-273.15)*1.8+32);
}

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
    getWeather(searchCity);
    searchStorage.unshift(searchCity);
    localStorage.setItem("Search History", JSON.stringify(searchStorage));
    showHistory();
})

//Clear Search History Button
$("#searchClear").on("click", function () {
    localStorage.removeItem("Search History");
    location.reload();
})

showHistory();