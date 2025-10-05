'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Cloud, Download, TrendingUp } from 'lucide-react'
import { LocationSearch } from '@/components/LocationSearch'
import { DatePicker } from '@/components/DatePicker'

interface Location {
  name: string
  lat: number
  lng: number
  country: string
  state?: string
  city?: string
  displayName: string
}
import { WeatherConditions } from '@/components/WeatherConditions'
import { WeatherResults } from '@/components/WeatherResults'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedConditions, setSelectedConditions] = useState(['temperature', 'precipitation'])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = () => {
    if (selectedLocation && selectedDate && selectedConditions.length > 0) {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"></div>
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Will It Rain On My{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                  Parade?
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
                Plan your outdoor events with confidence using{' '}
                <span className="font-semibold text-blue-600">NASA Earth observation data</span>. 
                Get weather probabilities for any location and date worldwide.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Global Coverage</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Historical Data</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Cloud className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">NASA Satellites</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Smart Analysis</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto overflow-visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Input Controls */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 overflow-visible">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div className="relative z-10 md:col-span-3">
                    <LocationSearch
                      onLocationSelect={setSelectedLocation}
                      selectedLocation={selectedLocation}
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-white/70 min-h-[300px] md:col-span-3">
                    {/* Lightweight embed of the map page on the right */}
                    <iframe
                      src={selectedLocation ? `/map?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}` : '/map'}
                      title="Map Preview"
                      className="w-full h-[340px] md:h-[300px]"
                      key={selectedLocation ? `${selectedLocation.lat},${selectedLocation.lng}` : 'default-map'}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="card hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  Date
                </h2>
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </div>

              <div className="card hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Cloud className="w-5 h-5 text-purple-600" />
                  </div>
                  Weather Conditions
                </h2>
                <WeatherConditions
                  selectedConditions={selectedConditions}
                  onConditionsChange={setSelectedConditions}
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={!selectedLocation || !selectedDate || selectedConditions.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300s disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <TrendingUp className="w-6 h-6" />
                <span className="text-lg">Get Weather Probabilities</span>
              </button>
            </div>

            {/* Right Panel - Results */}
            <div className="lg:col-span-2">
              {showResults && selectedLocation ? (
                <WeatherResults
                  location={selectedLocation}
                  date={selectedDate}
                  conditions={selectedConditions}
                />
              ) : (
                <div className="card text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-2xl"></div>
                    <div className="relative">
                      <div className="text-blue-400 mb-6">
                        <Cloud className="w-20 h-20 mx-auto animate-bounce-subtle" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to Check the Weather?
                      </h3>
                      <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                        Select a location, choose a date, and pick the weather conditions 
                        you want to analyze. We'll show you the probability of each condition 
                        based on <span className="font-semibold text-blue-600">NASA's historical Earth observation data</span>.
                      </p>
                      {selectedLocation && (
                        <div className="mt-6">
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/weather/openweather/current?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`)
                                const data = await res.json()
                                if (!res.ok) throw new Error(data?.message || 'Request failed')
                                alert(`OpenWeather: ${data?.name || 'Current'} Temp: ${data?.main?.temp ?? 'N/A'}°C`)
                              } catch (e: any) {
                                alert(`Failed to fetch OpenWeather data: ${e.message}`)
                              }
                            }}
                            className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow"
                          >
                            Quick Check via OpenWeather
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by NASA Earth Observation Data
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our application uses real satellite data from NASA's Earth observation missions 
              to provide accurate weather probability analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Global Coverage</h3>
              <p className="text-white-600 leading-relaxed">
                Access weather data for any location worldwide using NASA's global satellite coverage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Historical Analysis</h3>
              <p className="text-white leading-relaxed">
                Get probability estimates based on years of historical weather data and patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Cloud className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Multiple Conditions</h3>
              <p className="text-white leading-relaxed">
                Analyze temperature, precipitation, wind, air quality, and comfort levels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Export Data</h3>
              <p className="text-white leading-relaxed">
                Download your weather analysis in CSV or JSON format for further use.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
