import React from "react";

const weatherIcons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌧️",
  53: "🌧️",
  55: "🌧️",
  61: "🌧️",
  63: "⛈️",
  65: "⛈️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  80: "🌦️",
  81: "⛈️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

const weatherCodeDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function MainWeatherPanel({ weatherData, forecastData, cityName, tempUnit }) {
  if (!weatherData || !forecastData) return null;

  const hourlyData = forecastData.hourly;
  const dailyData = forecastData.daily;
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Build next 24 hours from hourly arrays (use available hourly.time index)
  const nextHours = (hourlyData.time || []).slice(0, 24).map((t, i) => ({
    time: new Date(t).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: false,
    }),
    temp: hourlyData.temperature_2m?.[i],
    code: hourlyData.weathercode?.[i],
  }));

  // Use daily arrays returned by API if present
  const nextDays = (dailyData.time || []).slice(0, 7).map((d, i) => ({
    day: new Date(d).toLocaleDateString("en-US", { weekday: "short" }),
    date: new Date(d).getDate(),
    maxTemp: dailyData.temperature_2m_max?.[i],
    minTemp: dailyData.temperature_2m_min?.[i],
    code: dailyData.weathercode?.[i],
  }));

  const getTemp = (temp) => {
    if (tempUnit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  return (
    <>
      {/* Main Weather Display */}
      <div className="glass-widget main-weather-display">
        <div className="weather-header">
          <div>
            <h2 className="current-temp">
              {getTemp(weatherData.temperature)}°
            </h2>
            <p className="weather-desc">
              {weatherCodeDescriptions[weatherData.weathercode] || "Unknown"}
            </p>
          </div>
          <div className="weather-emoji">
            {weatherIcons[weatherData.weathercode] || "🌡️"}
          </div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="glass-widget">
        <div className="weather-conditions">
          <div className="condition-item">
            <div className="label">Humidity</div>
            <div className="value">{weatherData.humidity || "N/A"}%</div>
          </div>
          <div className="condition-item">
            <div className="label">Wind Speed</div>
            <div className="value">
              {Math.round(weatherData.windspeed || 0)} m/s
            </div>
          </div>
          <div className="condition-item">
            <div className="label">Pressure</div>
            <div className="value">{weatherData.pressure || "N/A"} mb</div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="glass-widget">
        <h3 className="forecast-title">Hourly Forecast</h3>
        <div className="hourly-forecast">
          {nextHours.map((hour, idx) => (
            <div key={idx} className="hourly-item">
              <div className="time">{hour.time}</div>
              <div className="weather-icon">
                {weatherIcons[hour.code] || "🌡️"}
              </div>
              <div className="temp">{getTemp(hour.temp)}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Forecast */}
      <div className="glass-widget">
        <h3 className="forecast-title">7-Day Forecast</h3>
        <div className="daily-forecast">
          {nextDays.map((day, idx) => (
            <div key={idx} className="daily-item">
              <div className="day">{day.day}</div>
              <div className="weather-icon">
                {weatherIcons[day.code] || "🌡️"}
              </div>
              <div className="temp-range">
                <span className="temp-max">{getTemp(day.maxTemp)}°</span>
                <span className="temp-min">{getTemp(day.minTemp)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainWeatherPanel;
