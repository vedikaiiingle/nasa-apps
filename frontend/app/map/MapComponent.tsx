'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

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
    iconAnchor: [0, 0],
    popupAnchor: [0, -16]
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

const MapWithClick = ({ onMapClick, position, setPosition, weatherData, zoom }: MapWithClickProps) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
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
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [onMapClick, setPosition]);

  return (
    <div className="h-full w-full relative">
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position} icon={createPinIcon()}>
            <Popup className="custom-popup">
              <div className="text-center">
                <div className="font-bold mb-1 text-lg">📍 Selected Location</div>
                <div className="bg-blue-50 p-2 rounded mb-2">
                  <p className="text-sm font-mono">Lat: {position[0].toFixed(6)}°</p>
                  <p className="text-sm font-mono">Lng: {position[1].toFixed(6)}°</p>
                </div>
                {weatherData && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="font-semibold">{weatherData.name}</p>
                    <p className="text-2xl font-bold">{Math.round(weatherData.main?.temp)}°C</p>
                    <p className="capitalize text-sm">{weatherData.weather?.[0]?.description}</p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithClick;


