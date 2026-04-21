import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Weather } from './components/Weather';
import type { WeatherData } from './components/Weather';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Geocode the city name to get coordinates
      const geocodeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      if (!geocodeResponse.ok) {
        throw new Error('Failed to fetch geocoding data');
      }

      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.results || geocodeData.results.length === 0) {
        setError('City not found. Please try another search.');
        setIsLoading(false);
        return;
      }

      const location = geocodeData.results[0];
      const { latitude, longitude, name, country } = location;

      // Step 2: Fetch weather data for the coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      const current = weatherData.current;

      setWeather({
        city: name,
        country: country || 'Unknown',
        temperature: current.temperature_2m,
        description: getWeatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        feelsLike: current.apparent_temperature,
        uvIndex: current.uv_index,
        weatherCode: current.weather_code,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while fetching weather data'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherDescription = (weatherCode: number): string => {
    const descriptions: { [key: number]: string } = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy with Rime',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Slight Hail',
      99: 'Thunderstorm with Heavy Hail',
    };
    return descriptions[weatherCode] || 'Unknown';
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather App</h1>
        <p>Get current weather information for any city</p>
      </header>

      <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
      <Weather data={weather} error={error} />
    </div>
  );
}

export default App;
