function todaysDate() {
    var tDate = moment().local().format("ddd, MMM Do, YYYY - h:mm a");
    $("#todaysdate").text(tDate);
    setTimeout(todaysDate, 60000);
}

function fivedaydates() {
    var tDate = moment().local().format("ddd, MMM Do");
    $("#todayplusone").text(moment().add(1,'days').local().format("ddd, MMM Do"))
    $("#todayplustwo").text(moment().add(2,'days').local().format("ddd, MMM Do"))
    $("#todayplusthree").text(moment().add(3,'days').local().format("ddd, MMM Do"))
    $("#todayplusfour").text(moment().add(4,'days').local().format("ddd, MMM Do"))
    $("#todayplusfive").text(moment().add(5,'days').local().format("ddd, MMM Do"))
}

async function getWeather() {
    console.log("The click worked");
    var images = document.getElementsByTagName("img");
    //var i;
    for(i = 0; i < images.length; i++) {
        images[i].classList.add("hide");
    }
    var apikey = "f35f15ca2adc937d3e6afe2f22b4ba44";
    var searchInput = document.querySelector("#cityinput").value.trim();
//Coordinates
    https: var getCoordinates = "https://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=metric";
    var coordinateData = await fetch(getCoordinates);
    var data1 = await coordinateData.json();
    var coordinates = data1[0];
    var {lat, lon} = coordinates;
    var {name, state} = coordinates;
//Current weather
    https: var weatherDataUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=imperial";
    var response = await fetch(weatherDataUrl)
    var result = await response.json()
    var resultarray = Object.values(result);
    var cityname = resultarray[11];
    var icon = result.weather[0].icon;
    var {temp} = resultarray[3];
    var {humidity} = resultarray[3];
    var {speed} = resultarray[5];
    document.getElementById("currentcityname").textContent = name + ", " + state;
    document.getElementById("currenttemp").textContent = temp + "°F";
    document.getElementById("currenthumid").textContent = humidity + "% Humidity";
    document.getElementById("currentwind").textContent = speed + "mph Winds";
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("currentcityname").appendChild(img);
//Forecast weather
    https: var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=imperial&cnt=5";
    var response = await fetch(forecastUrl)
    var result = await response.json()
    var resultarray = Object.values(result);
    var forecast = resultarray[3];
//One day out
    var oneday = forecast[0];
    var {temp} = oneday.main;
    var {humidity} = oneday.main;
    var {speed} = oneday.wind;
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusone").appendChild(img);
    document.getElementById("onetemp").textContent = temp + "°F";
    document.getElementById("onehumid").textContent = humidity + "% Humidity";
    document.getElementById("onewind").textContent = speed + "mph Winds";
//Two days out
    var twodays = forecast[1];
    var icon = twodays.weather[0].icon;
    var {temp} = twodays.main;
    var {humidity} = twodays.main;
    var {speed} = twodays.wind;
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplustwo").appendChild(img);
    document.getElementById("twotemp").textContent = temp + "°F";
    document.getElementById("twohumid").textContent = humidity + "% Humidity";
    document.getElementById("twowind").textContent = speed + "mph Winds";
//Three days out
    var threedays = forecast[2];
    var {temp} = threedays.main;
    var {humidity} = threedays.main;
    var {speed} = threedays.wind;
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusthree").appendChild(img);
    document.getElementById("threetemp").textContent = temp + "°F";
    document.getElementById("threehumid").textContent = humidity + "% Humidity";
    document.getElementById("threewind").textContent = speed + "mph Winds";
//Four days out 
    var fourdays = forecast[3];
    var {temp} = fourdays.main;
    var {humidity} = fourdays.main;
    var {speed} = fourdays.wind;
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusfour").appendChild(img);
    document.getElementById("fourtemp").textContent = temp + "°F";
    document.getElementById("fourhumid").textContent = humidity + "% Humidity";
    document.getElementById("fourwind").textContent = speed + "mph Winds";
//Five days out
    var fivedays = forecast[4];
    var {temp} = fivedays.main;
    var {humidity} = fivedays.main;
    var {speed} = fivedays.wind;
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusfive").appendChild(img);
    document.getElementById("fivetemp").textContent = temp + "°F";
    document.getElementById("fivehumid").textContent = humidity + "% Humidity";
    document.getElementById("fivewind").textContent = speed + "mph Winds";
    document.getElementById("main").classList.remove("hide");
    var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
    var searchedCity = name;
    var searchedObject = {
        name: searchedCity,
        city: searchedCity
    };
    savedSearches.push(searchedObject);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    var searches = JSON.parse(window.localStorage.getItem('savedSearches')) || [];
    //if searches contains previous results, dont log them again
    console.log(searches);
    var optionsToDelete = document.querySelectorAll("option");
    console.log(optionsToDelete);
    for (i = 0; i < optionsToDelete.length; i++) {
        optionsToDelete[i].parentNode.removeChild(optionsToDelete[i])
    }
    for (var i = 0; i < searches.length; i++) {
        var option = document.createElement('option');
        option.textContent = searches[i].name;
        var div = document.getElementById('history');
        div.appendChild(option);
    }
    var searchInput = document.querySelector("#cityinput");
    searchInput.value = "";
}


//Submit button onclick events
var searchButton = document.querySelector("#submitbtn");
searchButton.addEventListener("click", getWeather);
//searchButton.addEventListener("click", () => {getWeather(); showSearchHistory();});

//Onload events
window.onload = function onload() {
    todaysDate();
    fivedaydates();
    //showSearchHistory();
}