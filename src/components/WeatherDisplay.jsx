import { Thermometer, Wind, Droplets, CloudSun } from "lucide-react";

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

function WeatherDisplay({ weatherData, cityName }) {
  if (!weatherData) return null;
  //WeatherDisplay and styling for the weather display component, which shows the current weather conditions for the selected city
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3>
        <CloudSun style={{ marginRight: "8px", verticalAlign: "middle" }} />
        Current Conditions: {cityName}
      </h3>
      <hr />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li
          style={{
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Thermometer size={20} />
          <strong>Temperature:</strong> {weatherData.temperature}°C
        </li>

        <li
          style={{
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Wind size={20} />
          <strong>Wind Speed:</strong> {weatherData.windspeed} m/s
        </li>

        <li
          style={{
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Droplets size={20} />
          <strong>Weather:</strong>{" "}
          {weatherCodeDescriptions[weatherData.weathercode] || "Unknown"}
          <span style={{ marginLeft: "8px", opacity: 0.8 }}>
            ({weatherData.weathercode})
          </span>
        </li>
      </ul>
    </div>
  );
} //WeatherDisplay

export default WeatherDisplay;
