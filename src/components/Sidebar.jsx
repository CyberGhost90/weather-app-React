import React, { useState } from "react";

function Sidebar({ setDarkMode, darkMode, tempUnit, setTempUnit }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="sidebar">
      {/* Home */}
      <div className="sidebar-item home-btn" title="Home Weather">
        🏠
      </div>

      {/* Locations */}
      <div className="sidebar-item locations-btn" title="My Locations">
        📍
      </div>

      {/* Divider */}
      <div className="sidebar-divider"></div>

      {/* Forecast */}
      <div className="sidebar-item forecast-btn" title="Forecast">
        📊
      </div>

      {/* Settings */}
      <div
        className="sidebar-item settings-btn"
        title="Settings"
        onClick={() => setShowSettings(!showSettings)}
      >
        ⚙️
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <h3>Settings</h3>

          <div className="setting-item">
            <label>Theme</label>
            <button
              className={`theme-toggle ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>

          <div className="setting-item">
            <label>Temperature</label>
            <button
              className={`unit-toggle ${tempUnit === "celsius" ? "active" : ""}`}
              onClick={() =>
                setTempUnit(tempUnit === "celsius" ? "fahrenheit" : "celsius")
              }
            >
              {tempUnit === "celsius" ? "°C" : "°F"}
            </button>
          </div>

          <div className="setting-item">
            <label>Set Home Location</label>
            <input
              type="text"
              placeholder="Enter city name"
              className="location-input"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
