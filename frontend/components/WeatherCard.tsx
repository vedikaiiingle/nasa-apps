'use client';

import { FiDroplet, FiWind, FiThermometer, FiMapPin } from 'react-icons/fi';

interface WeatherCardProps {
  weatherData: {
    temp: number;
    humidity: number;
    wind_speed: number;
    feels_like: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  locationName?: string;
}

export default function WeatherCard({ weatherData, locationName }: WeatherCardProps) {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
      {/* Top Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <FiMapPin className="mr-2" />
              {locationName || 'Current Location'}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{Math.round(weatherData.temp)}°C</p>
            <p className="text-blue-100 capitalize">{weatherData.weather[0]?.description}</p>
          </div>
        </div>

        {/* Weather Icon */}
        <div className="mt-4 flex justify-center">
          {weatherData.weather[0]?.icon && (
            <img 
              src={getWeatherIcon(weatherData.weather[0].icon)} 
              alt={weatherData.weather[0].main}
              className="w-24 h-24 -mb-6"
            />
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FiThermometer className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Feels like</p>
                <p className="font-semibold">{Math.round(weatherData.feels_like)}°C</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FiDroplet className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="font-semibold">{weatherData.humidity}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FiWind className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Wind</p>
                <p className="font-semibold">{(weatherData.wind_speed * 3.6).toFixed(1)} km/h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Sunset</p>
                <p className="font-semibold">6:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
