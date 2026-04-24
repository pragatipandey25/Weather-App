# Weather App

A fast React + TypeScript weather app built with Vite. Search for any city and see the current conditions pulled from Open-Meteo, including temperature, feels-like temperature, humidity, wind speed, UV index, and a readable weather summary.

## Features

- City search with loading and error states
- Current weather lookup using public Open-Meteo APIs
- Simple weather cards with icon, summary, and key metrics
- TypeScript-based component structure
- Zero API key setup required

## How It Works

The app uses two Open-Meteo endpoints in sequence:

1. It geocodes the city name with `https://geocoding-api.open-meteo.com/v1/search`.
2. It uses the returned coordinates to fetch current weather from `https://api.open-meteo.com/v1/forecast`.

If the city cannot be found, the UI shows a friendly error message instead of empty results.

## Tech Stack

- React 19
- TypeScript
- Vite
- ESLint

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Start the Dev Server

```bash
npm run dev
```

Vite will print a local address, usually `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Run Lint Checks

```bash
npm run lint
```

## Available Scripts

- `npm run dev` starts the development server.
- `npm run build` type-checks and builds the app for production.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint across the project.

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
netlify.toml
```

## Repository Notes

- The app is organized into a small container component and two feature components: search and weather display.
- Weather descriptions are mapped from Open-Meteo weather codes in `src/App.tsx`.
- Weather icons are derived from the same weather codes in `src/components/Weather.tsx`.
- If you update the favicon or browser icon, hard refresh the browser to clear cached assets.

## Deployment

The repo includes `netlify.toml`, so it is ready to be deployed on Netlify with the default Vite build output.

## Troubleshooting

- If searches return no results, try a more specific city name.
- If the app appears stale after a change, refresh the page and restart the dev server.
- If the browser still shows an old favicon, perform a hard refresh.
