'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Share2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Info,
  MapPin,
  Calendar
} from 'lucide-react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { WeatherChart } from './WeatherChart'
import { WeatherMap } from './WeatherMap'
import toast from 'react-hot-toast'

interface WeatherResultsProps {
  location: {
    name: string
    lat: number
    lng: number
    country: string
  }
  date: string
  conditions: string[]
}

interface WeatherData {
  location: any
  date: string
  conditions: {
    [key: string]: {
      [key: string]: number
      threshold: {
        [key: string]: number
      }
    }
  }
  metadata: {
    dataSource: string
    generatedAt: string
    units: {
      [key: string]: string
    }
  }
}

export function WeatherResults({ location, date, conditions }: WeatherResultsProps) {
  const [viewMode, setViewMode] = useState<'summary' | 'charts' | 'map'>('summary')
  const [isExporting, setIsExporting] = useState(false)

  // Fetch weather data
  const { data: weatherData, isLoading, error } = useQuery(
    ['weather-probabilities', location, date, conditions],
    async () => {
      const response = await axios.post('/api/weather/probabilities', {
        location,
        date,
        conditions
      })
      return response.data
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  )

  const handleExport = async (format: 'csv' | 'json') => {
    if (!weatherData) return

    setIsExporting(true)
    try {
      const response = await axios.post('/api/export/weather', {
        location,
        date,
        conditions,
        format,
        includeMetadata: true
      }, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `weather-data-${date}.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success(`Weather data exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export data')
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Weather Probability Report',
          text: `Weather probabilities for ${location.name} on ${new Date(date).toLocaleDateString()}`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }

  const getRiskLevel = (probability: number) => {
    if (probability >= 80) return { level: 'high', color: 'text-red-600', bg: 'bg-red-50' }
    if (probability >= 60) return { level: 'medium', color: 'text-orange-600', bg: 'bg-orange-50' }
    if (probability >= 40) return { level: 'moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { level: 'low', color: 'text-green-600', bg: 'bg-green-50' }
  }

  const getRecommendation = (weatherData: WeatherData) => {
    const highRiskConditions = []
    
    Object.entries(weatherData.conditions).forEach(([condition, data]) => {
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'number' && value >= 70) {
          highRiskConditions.push({ condition, key, value })
        }
      })
    })

    if (highRiskConditions.length === 0) {
      return {
        type: 'success',
        message: 'Great weather conditions expected! Perfect for outdoor activities.',
        icon: CheckCircle
      }
    } else if (highRiskConditions.length <= 2) {
      return {
        type: 'warning',
        message: 'Some weather conditions may be challenging. Consider backup plans.',
        icon: AlertTriangle
      }
    } else {
      return {
        type: 'error',
        message: 'Multiple adverse weather conditions likely. Consider postponing or having indoor alternatives.',
        icon: AlertTriangle
      }
    }
  }

  if (isLoading) {
    return (
      <div className="card text-center py-12">
        <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Analyzing Weather Data
        </h3>
        <p className="text-gray-600">
          Fetching historical weather data from NASA satellites...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card text-center py-12">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Unable to Load Weather Data
        </h3>
        <p className="text-gray-600 mb-4">
          There was an error fetching weather data. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!weatherData) {
    return null
  }

  const recommendation = getRecommendation(weatherData)
  const RecommendationIcon = recommendation.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Weather Probability Report
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Share results"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsExporting(!isExporting)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Export data"
              >
                <Download className="w-5 h-5" />
              </button>
              
              {isExporting && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                >
                  <button
                    onClick={() => handleExport('csv')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Export as JSON
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border-l-4 ${
            recommendation.type === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800'
              : recommendation.type === 'warning'
              ? 'bg-orange-50 border-orange-400 text-orange-800'
              : 'bg-red-50 border-red-400 text-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            <RecommendationIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Recommendation</h3>
              <p className="text-sm">{recommendation.message}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        {[
          { id: 'summary', label: 'Summary', icon: TrendingUp },
          { id: 'charts', label: 'Charts', icon: TrendingUp },
          { id: 'map', label: 'Map', icon: MapPin }
        ].map((mode) => {
          const Icon = mode.icon
          return (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === mode.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mode.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content based on view mode */}
      {viewMode === 'summary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(weatherData.conditions).map(([condition, data]) => (
            <motion.div
              key={condition}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                {condition.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              
              <div className="space-y-4">
                {Object.entries(data).map(([key, value]) => {
                  if (typeof value === 'number' && key !== 'threshold') {
                    const risk = getRiskLevel(value)
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`text-sm font-bold ${risk.color}`}>
                            {value}%
                          </span>
                        </div>
                        <div className="probability-bar">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`probability-fill ${risk.bg} ${risk.color.replace('text-', 'bg-')}`}
                          />
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'charts' && (
        <WeatherChart weatherData={weatherData} />
      )}

      {viewMode === 'map' && (
        <WeatherMap location={location} weatherData={weatherData} />
      )}

      {/* Metadata */}
      <div className="card bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Data Source Information</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Source: {weatherData.metadata.dataSource}</div>
          <div>Generated: {new Date(weatherData.metadata.generatedAt).toLocaleString()}</div>
          <div>Units: {Object.entries(weatherData.metadata.units).map(([key, unit]) => `${key}: ${unit}`).join(', ')}</div>
        </div>
      </div>
    </div>
  )
}
