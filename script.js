const API_KEY = "51aa488f5aa6b94495e7e8350e8a1b81";

let currentCity = "";
let currentUnit = "metric";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const unitToggle = document.getElementById("unitToggle");

const currentWeather = document.getElementById("currentWeather");
const hourlyForecast = document.getElementById("hourlyForecast");
const weeklyForecast = document.getElementById("weeklyForecast");

const humidityValue = document.getElementById("humidityValue");
const windValue = document.getElementById("windValue");
const feelsLikeValue = document.getElementById("feelsLikeValue");
const pressureValue = document.getElementById("pressureValue");

searchBtn.addEventListener("click", fetchWeather);

cityInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        fetchWeather();
    }

});

unitToggle.addEventListener("change", function(){

    currentUnit = unitToggle.checked ? "imperial" : "metric";

    if(currentCity !== ""){
        loadWeather(currentCity);
    }

});

function fetchWeather(){

    const city = cityInput.value.trim();

    if(city === ""){

        displayError("Please enter a city name.");

        return;

    }

    currentCity = city;

    loadWeather(city);

}

async function loadWeather(city){

    currentWeather.className = "weather-panel active";

    currentWeather.innerHTML = "<h2>Loading...</h2>";

    hourlyForecast.innerHTML = "";

    weeklyForecast.innerHTML = "";

    try{

        const currentURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${currentUnit}`;

        const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${currentUnit}`;

        const weatherResponse = await fetch(currentURL);

        if(!weatherResponse.ok){
            throw new Error("City not found");
        }

        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastURL);

        if(!forecastResponse.ok){
            throw new Error("Unable to load forecast");
        }

        const forecastData = await forecastResponse.json();

        renderCurrentWeather(weatherData);

        renderHourlyForecast(forecastData);

        renderWeeklyForecast(forecastData);

    }

    catch(error){

        displayError(error.message);

    }

}

function renderCurrentWeather(data){

    const icon =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const symbol =
    currentUnit === "metric" ? "°C" : "°F";

    const windUnit =
    currentUnit === "metric" ? "m/s" : "mph";

    currentWeather.className = "weather-panel active";

    currentWeather.innerHTML =

    `
        <img src="${icon}" alt="Weather Icon">

        <h2>${data.name}, ${data.sys.country}</h2>

        <h1>${Math.round(data.main.temp)}${symbol}</h1>

        <p>${capitalize(data.weather[0].description)}</p>
    `;

    humidityValue.textContent =
    data.main.humidity + "%";

    windValue.textContent =
    data.wind.speed + " " + windUnit;

    feelsLikeValue.textContent =
    Math.round(data.main.feels_like) + symbol;

    pressureValue.textContent =
    data.main.pressure + " hPa";

    applyTheme(data);

}

function applyTheme(data){

    const now = data.dt;

    const sunrise = data.sys.sunrise;

    const sunset = data.sys.sunset;

    if(now >= sunrise && now < sunset){

        document.body.classList.remove("dark");

    }

    else{

        document.body.classList.add("dark");

    }

    weatherEffects(data.weather[0].id);

}

function renderHourlyForecast(data){

    hourlyForecast.innerHTML = "";

    const unit =
    currentUnit === "metric" ? "°C" : "°F";

    const hours =
    data.list.slice(0,6);

    hours.forEach(item=>{

        const card =
        document.createElement("div");

        card.className = "hour-card";

        const icon =
        `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        card.innerHTML =

        `
            <p>${formatTime(item.dt_txt)}</p>

            <img src="${icon}" alt="">

            <strong>${Math.round(item.main.temp)}${unit}</strong>
        `;

        hourlyForecast.appendChild(card);

    });

}

function displayError(message){

    currentWeather.className = "weather-panel active";

    currentWeather.innerHTML =

    `
        <h2>${message}</h2>
    `;

}

function capitalize(text){

    return text
        .split(" ")
        .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
        .join(" ");

}

function formatTime(value){

    const date =
    new Date(value);

    return date.toLocaleTimeString([],{

        hour:"numeric",

        minute:"2-digit"

    });

}

/* ===========================
   WEEKLY FORECAST
=========================== */

function renderWeeklyForecast(data){

    weeklyForecast.innerHTML = "";

    const days = {};
    const symbol = currentUnit === "metric" ? "°C" : "°F";

    data.list.forEach(item=>{

        const date = item.dt_txt.split(" ")[0];

        if(!days[date]){

            days[date] = {

                day : getDay(date),

                min : item.main.temp_min,

                max : item.main.temp_max,

                icon : item.weather[0].icon

            };

        }

        else{

            days[date].min = Math.min(days[date].min,item.main.temp_min);

            days[date].max = Math.max(days[date].max,item.main.temp_max);

        }

    });

    Object.values(days).slice(0,7).forEach(day=>{

        const row = document.createElement("div");

        row.className = "week-card";

        row.innerHTML = `

            <span>${day.day}</span>

            <img src="https://openweathermap.org/img/wn/${day.icon}.png">

            <span>${Math.round(day.max)}${symbol} / ${Math.round(day.min)}${symbol}</span>

        `;

        weeklyForecast.appendChild(row);

    });

}


/* ===========================
   WEATHER EFFECTS
=========================== */

function weatherEffects(weatherId){

    clearRain();

    clearSnow();

    if(weatherId >= 200 && weatherId < 600){

        createRain();

    }

    else if(weatherId >= 600 && weatherId < 700){

        createSnow();

    }

}


/* ===========================
   RAIN EFFECT
=========================== */

function createRain(){

    const container = document.getElementById("rainEffect");

    for(let i=0;i<150;i++){

        const drop = document.createElement("div");

        drop.className = "drop";

        drop.style.left = Math.random()*100 + "%";

        drop.style.animationDuration =
        (0.3 + Math.random()*0.5) + "s";

        drop.style.animationDelay =
        Math.random()*2 + "s";

        container.appendChild(drop);

    }

}

function clearRain(){

    document.getElementById("rainEffect").innerHTML = "";

}


/* ===========================
   SNOW EFFECT
=========================== */

function createSnow(){

    const container = document.getElementById("snowEffect");

    for(let i=0;i<100;i++){

        const flake = document.createElement("div");

        flake.className = "flake";

        const size = 4 + Math.random()*8;

        flake.style.width = size + "px";

        flake.style.height = size + "px";

        flake.style.left = Math.random()*100 + "%";

        flake.style.animationDuration =
        (3 + Math.random()*4) + "s";

        flake.style.animationDelay =
        Math.random()*2 + "s";

        container.appendChild(flake);

    }

}

function clearSnow(){

    document.getElementById("snowEffect").innerHTML = "";

}


/* ===========================
   DATE UTILITY
=========================== */

function getDay(dateString){

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US",{

        weekday:"long"

    });

}


/* ===========================
   INITIAL SCREEN
=========================== */

currentWeather.innerHTML = `

    <h2>Search for a city to view weather information.</h2>

`;

hourlyForecast.innerHTML = "";

weeklyForecast.innerHTML = "";
