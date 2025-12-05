import React, { useState } from "react";
import "./App.css";


function App() {
  // State to store city input
  const [city, setCity] = useState("");

  // State to store weather data
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data
  const getWeather = () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Environment variable
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          alert("City not found");
          setWeather(null);
        }
      })
      .catch((err) => console.error(err));

      console.log("API Key:", process.env.REACT_APP_WEATHER_API_KEY);

  };

  return (
    <div className="App">
      {/* Header */}
      <h1 className="header">Weather App</h1>

      {/* Input + Search button */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {/* Weather Card */}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
