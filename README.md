# Weather App

A React + TypeScript weather application built with Vite.

The app lets you search for a city and shows current weather details, including:

- Temperature
- Feels like temperature
- Humidity
- Wind speed
- UV index
- Human-readable weather description

## Data Source

This project uses public Open-Meteo APIs:

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast/current weather: `https://api.open-meteo.com/v1/forecast`

No API key is required for the current implementation.

## Tech Stack

- React 19
- TypeScript
- Vite
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Start development server.
- `npm run build`: Type-check and build for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint checks.

## Project Structure

```text
src/
  components/
    SearchBar.tsx
    SearchBar.css
    Weather.tsx
    Weather.css
  App.tsx
  App.css
  main.tsx
  index.css
index.html
favicon.svg
```

## Notes

- The favicon is served from `favicon.svg` referenced in `index.html`.
- If the favicon does not appear updated, hard refresh the browser (`Ctrl+F5`) to clear favicon cache.
