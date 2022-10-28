var apiKey = "47f166773e351368285402b79068ea73" 

function getCityInput() {
    var city = document.getElementById("city-input").value

    fetchGeoCodeAPI(city)
    // addWeatherInfo(city)
}

document.getElementById("search-button").addEventListener("click", getCityInput)

function fetchGeoCodeAPI(city) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey
    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //console.log(data);
        fetchWeatherAPI(data[0].lat, data[0].lon)
    })
}

function fetchWeatherAPI(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey
    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        // console.log(data.timezone.split("/")[1]);
        // console.log(data.current.temp + "°C");
        // console.log(data.current.wind_speed + " " + "KMPH");
        // console.log(data.current.humidity + "%");
        // console.log(data.current.uvi);
        
        addWeatherInfo(data.timezone.split("/")[1], data.current.temp + "°C", data.current.wind_speed + " " + "KMPH", data.current.humidity + "%", data.current.uvi)
    })
}

function addWeatherInfo(city, temp, wind, humid, uvi) {
    var cityEl = document.querySelector(".weather-section").children[0]
    var tempEl = document.querySelector(".weather-section").children[1]
    var windEl = document.querySelector(".weather-section").children[2]
    var humidEl = document.querySelector(".weather-section").children[3]
    var uviEl = document.querySelector(".weather-section").children[4]

    cityEl.textContent = "City: " + city
    tempEl.textContent = "Temperature: " + temp
    windEl.textContent = "Wind Speed: " + wind
    humidEl.textContent = "Humidity: " + humid
    uviEl.textContent = "UV Index: " + uvi


    
}