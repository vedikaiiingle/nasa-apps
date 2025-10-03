'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Layers } from 'lucide-react'

interface WeatherMapProps {
  location: {
    name: string
    lat: number
    lng: number
  }
  weatherData: {
    conditions: {
      [key: string]: {
        [key: string]: number
      }
    }
  }
}

export function WeatherMap({ location, weatherData }: WeatherMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Dynamically import mapbox to avoid SSR issues
    const initMap = async () => {
      try {
        const mapboxgl = await import('mapbox-gl')
        
        if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
          setMapError('Mapbox token not configured')
          setIsLoading(false)
          return
        }

        mapboxgl.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

        mapInstance.current = new mapboxgl.default.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [location.lng, location.lat],
          zoom: 10
        })

        // Add location marker
        new mapboxgl.default.Marker({ color: '#3b82f6' })
          .setLngLat([location.lng, location.lat])
          .addTo(mapInstance.current)

        // Add popup
        const popup = new mapboxgl.default.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${location.name}</h3>
              <div class="text-sm text-gray-600 mt-1">
                <div>Lat: ${location.lat.toFixed(4)}</div>
                <div>Lng: ${location.lng.toFixed(4)}</div>
              </div>
            </div>
          `)

        new mapboxgl.default.Marker({ color: '#3b82f6' })
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(mapInstance.current)

        // Add weather layers
        addWeatherLayers(mapInstance.current)

        setIsLoading(false)
      } catch (error) {
        console.error('Map initialization error:', error)
        setMapError('Failed to load map')
        setIsLoading(false)
      }
    }

    initMap()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
      }
    }
  }, [location])

  const addWeatherLayers = (map: any) => {
    // Add weather condition markers
    Object.entries(weatherData.conditions).forEach(([condition, data]) => {
      const entries = Object.entries(data).filter(([key, value]) => 
        typeof value === 'number' && key !== 'threshold'
      )

      if (entries.length > 0) {
        const maxEntry = entries.reduce((max, [key, value]) => 
          value > max[1] ? [key, value] : max, entries[0]
        )

        // Create custom marker
        const el = document.createElement('div')
        el.className = 'weather-marker'
        el.style.cssText = `
          background-color: ${getConditionColor(condition)};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        `

        new (window as any).mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(new (window as any).mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-3">
                <h3 class="font-semibold text-gray-900 capitalize">${condition}</h3>
                <div class="text-sm text-gray-600 mt-2">
                  ${maxEntry[0]}: ${maxEntry[1]}%
                </div>
              </div>
            `))
          .addTo(map)
      }
    })
  }

  const getConditionColor = (condition: string) => {
    const colors = {
      temperature: '#ef4444',
      precipitation: '#3b82f6',
      wind: '#8b5cf6',
      airQuality: '#f59e0b',
      comfort: '#10b981'
    }
    return colors[condition as keyof typeof colors] || '#6b7280'
  }

  if (mapError) {
    return (
      <div className="card text-center py-12">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Map Unavailable
        </h3>
        <p className="text-gray-600 mb-4">{mapError}</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Location Details</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Name:</strong> {location.name}</div>
            <div><strong>Coordinates:</strong> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          Location Map
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Layers className="w-4 h-4" />
          <span>Weather Layers</span>
        </div>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="loading-spinner w-8 h-8 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={mapContainer} 
          className="w-full h-96 rounded-lg overflow-hidden"
        />
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Weather Conditions</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(weatherData.conditions).map(([condition, data]) => (
            <div key={condition} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getConditionColor(condition) }}
              />
              <span className="text-xs text-gray-600 capitalize">
                {condition.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
