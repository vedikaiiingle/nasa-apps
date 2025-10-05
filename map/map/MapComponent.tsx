'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom pin icon with animation
const createPinIcon = () => {
  return L.divIcon({
    className: 'custom-pin',
    html: `
      <div class="relative" style="transform: translate(-50%, -100%)">
        <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
        <div class="absolute inset-0 rounded-full bg-red-500 opacity-40 animate-ping"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [0, 0],  // Set to 0,0 since we're handling positioning with CSS transform
    popupAnchor: [0, -16]  // Adjusted to position popup above the pin
  });
};

interface MapWithClickProps {
  onMapClick: (lat: number, lng: number) => void;
  position: [number, number];
  setPosition: (position: [number, number]) => void;
  weatherData: any;
  setWeatherData: (data: any) => void;
  zoom: number;
}

const MapWithClick = ({ 
  onMapClick, 
  position, 
  setPosition, 
  weatherData, 
  setWeatherData,
  zoom 
}: MapWithClickProps) => {
  const mapRef = useRef<L.Map>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle map click - update position without zooming
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    
    // Disable all zoom controls and interactions
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    
    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const newPosition: [number, number] = [lat, lng];
      setPosition(newPosition);
      onMapClick(lat, lng);
      
      console.log(`Clicked at: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [onMapClick, setPosition]);

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapRef.current) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        mapRef.current.flyTo(newPosition, 10);
        onMapClick(newPosition[0], newPosition[1]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  // Add custom styles for the map
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-pin {
        background: transparent;
        border: none;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 3px 14px rgba(0,0,0,0.2);
      }
      .leaflet-popup-content {
        margin: 10px 12px;
        line-height: 1.4;
      }
      .leaflet-popup-tip {
        background: white;
      }
      .leaflet-container a.leaflet-popup-close-button {
        padding: 8px 12px 0 0;
        color: #6b7280;
      }
      .leaflet-container a.leaflet-popup-close-button:hover {
        color: #ef4444;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-full w-full relative">
      {/* Coordinates Display - Moved to top of the map */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
        <div className="flex items-center gap-4 text-sm">
          <div className="font-medium">
            <span className="text-gray-500">Lat:</span> {position[0].toFixed(4)}°
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="font-medium">
            <span className="text-gray-500">Lng:</span> {position[1].toFixed(4)}°
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 right-4 z-[1000] max-w-md">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city or address..."
            className="flex-1 p-3 rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Search
          </button>
        </form>
      </div>
      
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={false}
        zoomSnap={0}
        zoomDelta={0}
        className="z-0"
        zoomAnimation={false}
        doubleClickZoom={false}
        touchZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        dragging={true}
      >
        {/* Removed duplicate coordinates display */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker 
            position={position} 
            icon={createPinIcon()}
            eventHandlers={{
              click: () => {
                // Smooth zoom to marker when clicked
                if (mapRef.current) {
                  mapRef.current.flyTo(position, 13, {
                    duration: 1,
                    animate: true
                  });
                }
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="text-center">
                <div className="font-bold mb-1 text-lg">📍 Selected Location</div>
                <div className="bg-blue-50 p-2 rounded mb-2">
                  <p className="text-sm font-mono">Lat: {position[0].toFixed(6)}°</p>
                  <p className="text-sm font-mono">Lng: {position[1].toFixed(6)}°</p>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Click anywhere to move pin
                </div>
                {weatherData && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="font-semibold">{weatherData.name}</p>
                    <p className="text-2xl font-bold">{Math.round(weatherData.main?.temp)}°C</p>
                    <p className="capitalize text-sm">{weatherData.weather?.[0]?.description}</p>
                    <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                      <div>Humidity: {weatherData.main?.humidity}%</div>
                      <div>Wind: {weatherData.wind?.speed} m/s</div>
                      <div>Feels like: {Math.round(weatherData.main?.feels_like)}°C</div>
                      <div>Pressure: {weatherData.main?.pressure} hPa</div>
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {weatherData && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000] max-w-md">
          <h3 className="text-lg font-semibold">{weatherData.name}, {weatherData.sys?.country}</h3>
          <div className="flex items-center">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`} 
              alt={weatherData.weather?.[0]?.description} 
              className="w-16 h-16"
            />
            <div>
              <p className="text-2xl font-bold">{Math.round(weatherData.main?.temp)}°C</p>
              <p className="capitalize">{weatherData.weather?.[0]?.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>Humidity: {weatherData.main?.humidity}%</div>
            <div>Wind: {weatherData.wind?.speed} m/s</div>
            <div>Feels like: {Math.round(weatherData.main?.feels_like)}°C</div>
            <div>Pressure: {weatherData.main?.pressure} hPa</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithClick;
