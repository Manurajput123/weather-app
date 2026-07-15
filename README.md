https://manurajput123.github.io/weather-app/

# Weather Dashboard

SkyCast is a lightweight weather dashboard that provides current weather conditions, hourly updates, and a multi-day forecast for any city using the OpenWeather API. It features a responsive interface, animated weather effects, and automatic day/night themes.

---

## Features

- Search weather by city
- View temperature in Celsius or Fahrenheit
- Current weather information
- Humidity and wind speed
- Hourly forecast
- Multi-day weather forecast
- Automatic day and night theme
- Animated rain effect during rainy weather
- Animated snow effect during snowy weather
- Responsive layout for desktop and mobile devices
- Friendly error handling for invalid city names

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- OpenWeather API

---

## Project Structure

```
skycast-weather/
│── index.html
│── style.css
│── script.js
└── README.md
```

---

## How to Run

1. Download or clone the project.

```
git clone https://github.com/Manurajput123/weather-app.git
```

2. Open the project folder.

3. Generate an API key from OpenWeather.

4. Open `script.js` and replace:

```javascript
const API_KEY = "51aa488f5aa6b94495e7e8350e8a1b81";
```

5. Open `index.html` using Live Server or any local web server.

---

## Application Overview

### Search Weather
Enter the name of any city and click the search button to retrieve the latest weather information.

### Current Weather
Displays:

- City name
- Temperature
- Weather condition
- Humidity
- Wind speed

### Hourly Forecast

Shows upcoming hourly weather updates with weather icons and temperatures.

### Multi-Day Forecast

Displays daily weather summaries including minimum and maximum temperatures.

### Theme Switching

The interface automatically switches between daytime and nighttime colors according to the city's local sunrise and sunset times.

### Weather Effects

- Rain animation during rainy conditions
- Snow animation during snowfall

---

## Future Improvements

- Air Quality Index (AQI)
- UV Index
- Weather maps
- Current location support
- Favorite cities
- Sunrise and sunset cards
- Pressure and visibility information

---

## API

OpenWeather API

Documentation:

https://openweathermap.org/api

---

## License

This project is developed for educational purposes and personal learning.
