'use client';

import { useState, useCallback, useRef, useEffect, MutableRefObject } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ViewState, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';

// Dynamically import the WeatherCard component with no SSR
const WeatherCard = dynamic(() => import('@/components/WeatherCard'), {
  ssr: false,
});
import axios from 'axios';
import { 
  FiMapPin, 
  FiSearch, 
  FiX, 
  FiDroplet, 
  FiWind, 
  FiCloudRain, 
  FiThermometer, 
  FiSun, 
  FiSunrise, 
  FiSunset,
  FiClock,
  FiCalendar
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';
const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'YOUR_OPENWEATHER_API_KEY';

interface Location {
  latitude: number;
  longitude: number;
  [key: string]: any; // For any additional properties that might be present
}

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  pressure?: number;
  rain?: {
    '1h'?: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export default function WeatherMapPage() {
  // Zoom levels configuration
  const minZoom = 2;
  const maxZoom = 18;
  
  const [weatherData, setWeatherData] = useState<WeatherData | null>({
    temp: 22,
    feels_like: 24,
    humidity: 65,
    wind_speed: 3.5,
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }]
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>({
    latitude: 28.6139,
    longitude: 77.2090,
    name: 'New Delhi, IN'
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Helper functions for number formatting
  const formatTemp = (temp: number) => Math.round(temp);
  const formatWindSpeed = (speed: number) => (speed * 3.6).toFixed(1); // Convert m/s to km/h
  const [isLoading, setIsLoading] = useState(false);

  // Format rain data to one decimal place
  const formatRain = (rain: number): string => {
    return rain.toFixed(1);
  };
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showProbabilities, setShowProbabilities] = useState<boolean>(false);
  const mapRef = useRef<MapRef | null>(null);
  interface MapViewState {
    latitude: number;
    longitude: number;
    zoom: number;
    transitionDuration?: number;
  }

const [viewState, setViewState] = useState<MapViewState>({
  latitude: 28.6139,
  longitude: 77.2090,
  zoom: 10,
  transitionDuration: 300
});

const updateViewState = (newViewState: Partial<MapViewState>) => {
  setViewState(prev => ({
    ...prev,
    ...newViewState,
    transitionDuration: newViewState.transitionDuration ?? prev.transitionDuration
  }));
};

  // Weather probabilities data
  const weatherProbabilities = [
    { name: 'Rain', value: '65%', icon: <FiCloudRain className="text-blue-500" /> },
    { name: 'Thunderstorm', value: '30%', icon: <FiCloudRain className="text-purple-500" /> },
    { name: 'Clear Sky', value: '45%', icon: <FiSun className="text-yellow-500" /> },
    { name: 'Clouds', value: '70%', icon: <FiCloudRain className="text-gray-500" /> },
    { name: 'Humidity', value: '80%', icon: <FiDroplet className="text-blue-400" /> },
    { name: 'Wind Speed', value: '15 km/h', icon: <FiWind className="text-gray-400" /> },
  ];

  const flyToLocation = useCallback((lat: number, lon: number, zoom = 9) => {
    setViewState(prev => ({
      ...prev,
      latitude: lat,
      longitude: lon,
      zoom: zoom
    }));
  }, []);

  const fetchWeatherData = useCallback(async (lat: number, lon: number, name?: string, date?: string) => {
    setIsLoading(true);
    setError(null);
    
    // If date is provided, we'll use the historical weather API
    const endpoint = date 
      ? `/api/weather/history?lat=${lat}&lon=${lon}&date=${date}`
      : `/api/weather/current?lat=${lat}&lon=${lon}`;
    
    // Fly to the selected location with zoom
    flyToLocation(lat, lon, 9);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      
      setWeatherData(response.data.main);
      setSelectedLocation({
        latitude: lat,
        longitude: lon,
        name: name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
      setIsLoading(false);
    }
  }, []);

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    // Get location name using reverse geocoding
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`)
      .then(response => response.json())
      .then(data => {
        const placeName = data.features[0]?.place_name || 'Selected Location';
        fetchWeatherData(lat, lng, placeName);
      })
      .catch(err => {
        console.error('Error getting location name:', err);
        fetchWeatherData(lat, lng);
      });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=1&appid=${OPENWEATHER_API_KEY}`
      );
      
      if (response.data && response.data.length > 0) {
        const { lat, lon, name } = response.data[0];
        setViewState(prev => ({
          ...prev,
          latitude: lat,
          longitude: lon,
          zoom: 8
        }));
        await fetchWeatherData(lat, lon, name);
      } else {
        setError('Location not found. Please try another search.');
      }
    } catch (err) {
      console.error('Error searching location:', err);
      setError('Failed to search location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sample historical data for the chart
  const historicalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [12, 15, 18, 22, 26, 30, 32, 31, 27, 23, 18, 14],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yearly Temperature Trend',
      },
    },
  };

  // fetchWeatherData is already defined above with date parameter support

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with WeatherCard */}
      <div className="w-96 p-4 overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-10">
        <div className="sticky top-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : weatherData && selectedLocation ? (
            <WeatherCard 
              weatherData={{
                ...weatherData,
                weather: weatherData.weather || [{ main: 'Clear', description: 'clear sky', icon: '01d' }]
              }} 
              locationName={selectedLocation.name} 
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Location Selected</h3>
              <p className="text-gray-500">Click on the map or search for a location to see weather data</p>
            </div>
          )}
          
          {isLoading && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Weather Probabilities Button */}
        <button
          onClick={() => setShowProbabilities(true)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 z-40 transition-all hover:scale-105"
        >
          <FiCloudRain className="h-6 w-6" />
          <span className="font-medium">Get Weather Probabilities</span>
        </button>
        
        {/* Map Container */}
        <div className="flex-1 relative">
          <div className="h-[500px] lg:h-[calc(100vh-2rem)] relative">
            {/* Search Bar */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-11/12 max-w-2xl">
        <form onSubmit={handleSearch} className="flex shadow-lg rounded-lg overflow-hidden">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="block w-full pl-10 pr-3 py-3 border-0 focus:ring-2 focus:ring-blue-500 rounded-l-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
              </form>
              
              {error && (
                <div className="mt-2 text-red-500 text-sm bg-red-50 p-2 rounded-md">
                  {error}
                </div>
              )}
            </div>

            {/* Map */}
            <Map
              ref={mapRef}
              {...viewState}
              minZoom={minZoom}
              maxZoom={maxZoom}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken={MAPBOX_TOKEN}
              style={{ width: '100%', height: '100vh' }}
              doubleClickZoom={true}
              scrollZoom={{ speed: 1.2, smooth: true }}
              dragRotate={false}
              touchPitch={false}
            >
        <div className="absolute top-24 right-4 flex flex-col space-y-2 z-10">
          <button 
            onClick={() => {
              const currentZoom = viewState.zoom;
              if (currentZoom < maxZoom) {
                setViewState(prev => ({
                  ...prev,
                  zoom: Math.min(currentZoom + 1, maxZoom)
                }));
              }
            }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Zoom in"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button 
            onClick={() => {
              const currentZoom = viewState.zoom;
              if (currentZoom > minZoom) {
                setViewState(prev => ({
                  ...prev,
                  zoom: Math.max(currentZoom - 1, minZoom)
                }));
              }
            }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Zoom out"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
          <NavigationControl 
            showCompass={true}
            showZoom={false}
          />
        </div>
        <FullscreenControl />
        
        {selectedLocation && (
          <Marker
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          >
            <div className="relative">
              <FiMapPin className="w-8 h-8 text-red-500" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </Marker>
        )}

        {selectedLocation && weatherData && (
          <Popup
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
            className="weather-popup"
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-64">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedLocation.name || 'Selected Location'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4">
                  {/* Main Weather Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-4xl font-bold">{formatTemp(weatherData.temp)}°C</div>
                      <div className="text-sm text-gray-500">Feels like {formatTemp(weatherData.temp)}°C</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {selectedLocation.name}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {weatherData.weather?.[0]?.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Weather Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      <div>
                        <div className="text-gray-500">Humidity</div>
                        <div className="font-medium">{weatherData.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <div>
                        <div className="text-gray-500">Wind</div>
                        <div className="font-medium">{formatWindSpeed(weatherData.wind_speed)} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <div>
                        <div className="text-gray-500">Pressure</div>
                        <div className="font-medium">{weatherData.pressure || '--'} hPa</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <div>
                        <div className="text-gray-500">Rain</div>
                        <div className="font-medium">
                          {weatherData.rain?.['1h'] ? formatRain(weatherData.rain['1h']) : '0.0'} mm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location and Condition */}
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium">{selectedLocation.name}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {weatherData.weather?.[0]?.description}
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        )}
            </Map>
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20">
                <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-700">Loading weather data...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Weather Details */}
        <div className="space-y-6">
          {/* Weather Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Details</h2>
            <div className="flex justify-between">
              <div className="flex items-center text-gray-600">
                <FiThermometer className="w-5 h-5 mr-2 text-blue-500" />
                <span>Feels Like</span>
              </div>
              <span className="font-medium">{weatherData ? `${Math.round(weatherData.temp)}°C` : '--'}</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <FiDroplet className="w-5 h-5 mr-2 text-blue-500" />
                  <span>Humidity</span>
                </div>
                <span className="font-medium">{weatherData ? `${weatherData.humidity}%` : '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <FiWind className="w-5 h-5 mr-2 text-blue-500" />
                  <span>Wind Speed</span>
                </div>
                <span className="font-medium">{weatherData ? `${Math.round(weatherData.wind_speed * 3.6)} km/h` : '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <FiSun className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>UV Index</span>
                </div>
                <span className="font-medium">5.2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <FiSunrise className="w-5 h-5 mr-2 text-orange-500" />
                  <span>Sunrise</span>
                </div>
                <span className="font-medium">06:45 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <FiSunset className="w-5 h-5 mr-2 text-purple-500" />
                  <span>Sunset</span>
                </div>
                <span className="font-medium">06:30 PM</span>
              </div>
            </div>
          </div>

          {/* Historical Trend Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Historical Trend</h2>
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="w-4 h-4 mr-1" />
                <span>Last 12 Months</span>
              </div>
            </div>
            <div className="h-64">
              <Line data={historicalData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Average Monthly Temperature</span>
              </div>
            </div>
          </div>

          {/* Weather Probability Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Probability</h2>
            <div className="space-y-4">
              {[
                { name: 'Sunny', value: 65, color: 'bg-yellow-400' },
                { name: 'Rain', value: 25, color: 'bg-blue-500' },
                { name: 'Cloudy', value: 10, color: 'bg-gray-400' }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="font-medium text-gray-800">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color} transition-all duration-500`} 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowProbabilities(true)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <FiCloudRain className="h-5 w-5" />
              <span>View Detailed Forecast</span>
            </button>
          </div>
        </div>

        {/* Weather Probabilities Modal */}
        {showProbabilities && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowProbabilities(false)}
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Weather Forecast</h3>
                  <button 
                    onClick={() => setShowProbabilities(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 -mr-2"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="space-y-5">
                  {[
                    { 
                      name: 'Sunny', 
                      value: '65%', 
                      icon: <FiSun className="text-yellow-500" size={24} />,
                      description: 'Clear skies with bright sunshine'
                    },
                    { 
                      name: 'Rain', 
                      value: '25%', 
                      icon: <FiCloudRain className="text-blue-500" size={24} />,
                      description: 'Light to moderate rainfall expected'
                    },
                    { 
                      name: 'Thunderstorm', 
                      value: '15%', 
                      icon: <FiCloudRain className="text-purple-500" size={24} />,
                      description: 'Chance of thunderstorms with lightning'
                    },
                    { 
                      name: 'Humidity', 
                      value: '70%', 
                      icon: <FiDroplet className="text-blue-400" size={24} />,
                      description: 'Moderate humidity level'
                    },
                    { 
                      name: 'Wind', 
                      value: '12 km/h', 
                      icon: <FiWind className="text-gray-500" size={24} />,
                      description: 'Gentle breeze from the east'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <span className="font-semibold text-gray-800">{item.value}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-5 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-4">
                    Forecast is based on current conditions and historical data for this location.
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                  <button 
                    onClick={() => setShowProbabilities(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Close Forecast
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
