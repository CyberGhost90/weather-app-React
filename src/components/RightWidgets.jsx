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

function RightWidgets({ weatherData, forecastData, tempUnit }) {
  const getTemp = (temp) => {
    if (temp == null) return "N/A";
    if (tempUnit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  // Mock recently searched cities
  const recentCities = [
    { name: "London, UK", temp: 15, code: 2 },
    { name: "Paris, France", temp: 18, code: 1 },
    { name: "Tokyo, Japan", temp: 22, code: 0 },
  ];

  return (
    <>
      {/* Humidity, Wind & Pressure */}
      <div className="glass-widget">
        <h3
          style={{
            fontSize: "12px",
            margin: "0 0 16px 0",
            opacity: 0.7,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Live Conditions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontSize: "12px", opacity: 0.8 }}>Humidity</span>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              {weatherData?.humidity || "N/A"}%
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontSize: "12px", opacity: 0.8 }}>Wind</span>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              {weatherData ? Math.round(weatherData.windspeed || 0) : "N/A"} m/s
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontSize: "12px", opacity: 0.8 }}>Pressure</span>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              {weatherData?.pressure || "N/A"} mb
            </span>
          </div>
        </div>
      </div>

      {/* Recently Searched */}
      <div className="glass-widget">
        <div className="recently-searched">
          <h3>Recently Searched</h3>
          {recentCities.map((city, idx) => (
            <div key={idx} className="recent-item">
              <div>
                <div className="location">{city.name}</div>
                <span style={{ fontSize: "11px", opacity: 0.6 }}>
                  {weatherIcons[city.code]}
                </span>
              </div>
              <div className="temp">{city.temp}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wind Map */}
      <div className="glass-widget wind-map">
        <h4>Wind Map</h4>
        <div style={{ fontSize: "24px", margin: "8px 0" }}>💨</div>
        <div className="wind-speed">
          {weatherData ? Math.round(weatherData.windspeed || 0) : 0} m/s
        </div>
        <div className="wind-direction">Northwest</div>
      </div>
    </>
  );
}

export default RightWidgets;
