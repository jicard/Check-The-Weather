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
    https: var getCoordinates = "https://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=metric";
    var coordinateData = await fetch(getCoordinates);
    var data1 = await coordinateData.json();
    console.log(data1);
    var coordinates = data1[0];
    console.log(coordinates);
    var {lat, lon} = coordinates;
    console.log(lat, lon);
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

}
//Submit button onclick events
var searchButton = document.querySelector("#submitbtn");
searchButton.addEventListener("click", getWeather);

//Onload events
window.onload = function onload() {
    todaysDate();
    fivedaydates();
}