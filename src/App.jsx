import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import Sidebar from "./components/Sidebar";
import MainWeatherPanel from "./components/MainWeatherPanel";
import RightWidgets from "./components/RightWidgets";
import "./App.css";

function App() {
  //global state for the selected city and weather data
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [tempUnit, setTempUnit] = useState("celsius");

  //useEffect allows us to fetch weather data whenever the selected city changes
  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      const { latitude, longitude, timezone } = selectedCity.value;

      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: latitude,
              longitude: longitude,
              current_weather: true,
              hourly: "temperature_2m,weathercode",
              daily: "weathercode,temperature_2m_max,temperature_2m_min",
              timezone: timezone,
              temperature_unit:
                tempUnit === "celsius" ? "celsius" : "fahrenheit",
            },
          },
        );
        setWeatherData(response.data.current_weather);
        setForecastData(response.data);
      } catch (error) {
        console.error("Meteorological payload collection failure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity, tempUnit]); //useEffect

  return (
    <div className={`app-wrapper ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Sidebar
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
      />

      <div className="main-content">
        <div className="header">
          <div className="location-info">
            <h1>{selectedCity?.label || "Select a city"}</h1>
            <p className="date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            className="search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            🔍
          </button>
        </div>

        {searchOpen && (
          <div className="search-bar-wrapper">
            <SearchInput value={selectedCity} onChange={setSelectedCity} />
          </div>
        )}

        <div className="content-grid">
          <div className="left-widgets">
            <RightWidgets
              weatherData={weatherData}
              forecastData={forecastData}
              tempUnit={tempUnit}
            />
          </div>

          <div className="main-panel">
            {loading && (
              <div className="loading-container">
                <p>Loading weather data...</p>
              </div>
            )}

            {!loading && weatherData && forecastData && (
              <MainWeatherPanel
                weatherData={weatherData}
                forecastData={forecastData}
                cityName={selectedCity.label}
                tempUnit={tempUnit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ); //return
} //app

export default App;
