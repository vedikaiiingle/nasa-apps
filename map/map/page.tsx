'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';

// Client-only lazy import to avoid SSR "window is not defined" issues
const MapWithClick = lazy(() => import('./MapComponent'));

export default function MapPage() {
  const [position, setPosition] = useState<[number, number]>([20.5937, 78.9629]); // Default to India coordinates
  const [weatherData, setWeatherData] = useState<any>(null);
  const [zoom, setZoom] = useState(5);
  const [mounted, setMounted] = useState(false);

  // Function to handle map clicks and fetch weather data
  const handleMapClick = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Initial weather fetch for default position
  useEffect(() => {
    handleMapClick(position[0], position[1]);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-screen w-full">
      <Suspense fallback={<div className="p-4">Loading map…</div>}>
        <MapWithClick
          onMapClick={handleMapClick}
          position={position}
          setPosition={setPosition}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          zoom={zoom}
        />
      </Suspense>
    </div>
  );
}
