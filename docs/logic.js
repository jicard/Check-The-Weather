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
    var apikey = "f35f15ca2adc937d3e6afe2f22b4ba44";
    var searchInput = document.querySelector("#cityinput").value.trim();
    console.log(searchInput);
//Coordinates
    https: var getCoordinates = "https://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=metric";
    var coordinateData = await fetch(getCoordinates);
    var data1 = await coordinateData.json();
    console.log(data1);
    var coordinates = data1[0];
    console.log(coordinates);
    var {lat, lon} = coordinates;
    console.log(lat, lon);
//Current weather
    https: var weatherDataUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=imperial";
    var response = await fetch(weatherDataUrl)
    var result = await response.json()
    console.log(result);
    var resultarray = Object.values(result);
    console.log(resultarray);
    var cityname = resultarray[11];
    console.log(cityname);
    console.log(result.weather[0].icon);
    var {temp} = resultarray[3];
    console.log(temp);
    var {humidity} = resultarray[3];
    console.log(humidity);
    var {speed} = resultarray[5];
    console.log(speed);
//Forecast weather
    https: var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=imperial&cnt=5";
    var response = await fetch(forecastUrl)
    var result = await response.json()
    console.log(result);
    var resultarray = Object.values(result);
    console.log(resultarray);
    var forecast = resultarray[3];
    console.log(forecast);
//One day out
    var oneday = forecast[0];
    console.log("one day out below");
    console.log(oneday.weather[0].icon);
    var {temp} = oneday.main;
    console.log(temp);
    var {humidity} = oneday.main;
    console.log(humidity);
    var {speed} = oneday.wind;
    console.log(speed);
//Two days out
    var twodays = forecast[1];
    console.log("two days out below");
    console.log(twodays.weather[0].icon);
    var {temp} = twodays.main;
    console.log(temp);
    var {humidity} = twodays.main;
    console.log(humidity);
    var {speed} = twodays.wind;
    console.log(speed);
//Three days out
    var threedays = forecast[2];
    console.log("three days out below");
    console.log(threedays.weather[0].icon);
    var {temp} = threedays.main;
    console.log(temp);
    var {humidity} = threedays.main;
    console.log(humidity);
    var {speed} = threedays.wind;
    console.log(speed);
//Four days out 
    var fourdays = forecast[3];
    console.log("four days out below");
    console.log(fourdays.weather[0].icon);
    var {temp} = fourdays.main;
    console.log(temp);
    var {humidity} = fourdays.main;
    console.log(humidity);
    var {speed} = fourdays.wind;
    console.log(speed);
//Five days out
    var fivedays = forecast[4];
    console.log("five days out below");
    console.log(fivedays.weather[0].icon);
    var {temp} = fivedays.main;
    console.log(temp);
    var {humidity} = fivedays.main;
    console.log(humidity);
    var {speed} = fivedays.wind;
    console.log(speed);
}

//Submit button onclick events
var searchButton = document.querySelector("#submitbtn");
searchButton.addEventListener("click", getWeather);

//Onload events
window.onload = function onload() {
    todaysDate();
    fivedaydates();
}