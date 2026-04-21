import React from 'react';
import './Weather.css';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
  weatherCode: number;
}

interface WeatherProps {
  data: WeatherData | null;
  error: string | null;
}

const getWeatherIcon = (weatherCode: number): string => {
  // WMO Weather interpretation codes
  if (weatherCode === 0) return '☀️';
  if (weatherCode === 1 || weatherCode === 2) return '🌤️';
  if (weatherCode === 3) return '☁️';
  if (weatherCode === 45 || weatherCode === 48) return '🌫️';
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) return '🌧️';
  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) return '🌧️';
  if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) return '❄️';
  if (weatherCode === 77) return '❄️';
  if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) return '🌧️';
  if (weatherCode === 85 || weatherCode === 86) return '❄️';
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) return '⛈️';
  return '🌤️';
};

export const Weather: React.FC<WeatherProps> = ({ data, error }) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!data) {
    return <div className="no-data">Search for a city to see the weather</div>;
  }

  const icon = getWeatherIcon(data.weatherCode);

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>{data.city}</h2>
        <p className="country">{data.country}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon">{icon}</div>
        <div className="temperature">
          <span className="temp-value">{Math.round(data.temperature)}°C</span>
          <p className="description">{data.description}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Feels Like</span>
          <span className="value">{Math.round(data.feelsLike)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed</span>
          <span className="value">{data.windSpeed.toFixed(1)} m/s</span>
        </div>
        <div className="detail-item">
          <span className="label">UV Index</span>
          <span className="value">{data.uvIndex}</span>
        </div>
      </div>
    </div>
  );
};
