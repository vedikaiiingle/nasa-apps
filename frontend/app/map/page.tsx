'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Client-only lazy import to avoid SSR issues
const MapWithClick = lazy(() => import('./MapComponent'));

export default function MapPage() {
  const [position, setPosition] = useState<[number, number]>([20.5937, 78.9629]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [zoom, setZoom] = useState(5);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

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

  useEffect(() => {
    const latParam = searchParams?.get('lat');
    const lngParam = searchParams?.get('lng');
    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        setPosition([lat, lng]);
        setZoom(8);
        handleMapClick(lat, lng);
      }
    } else {
      handleMapClick(position[0], position[1]);
    }
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


