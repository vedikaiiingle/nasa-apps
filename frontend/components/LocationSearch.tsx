'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, X } from 'lucide-react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Fuse from 'fuse.js'

interface Location {
  name: string
  lat: number
  lng: number
  country: string
  state?: string
  city?: string
  displayName: string
}

interface LocationSearchProps {
  onLocationSelect: (location: Location | null) => void
  selectedLocation: Location | null
}

export function LocationSearch({ onLocationSelect, selectedLocation }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Search locations
  const { data: searchResults, isLoading } = useQuery(
    ['location-search', searchQuery],
    async () => {
      if (searchQuery.length < 2) return []
      
      const response = await axios.get('/api/location/search', {
        params: { q: searchQuery, limit: 10 }
      })
      return response.data.locations
    },
    {
      enabled: searchQuery.length >= 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  // Popular locations
  const { data: popularLocations } = useQuery(
    'popular-locations',
    async () => {
      const response = await axios.get('/api/location/popular')
      return response.data.locations
    },
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    setShowResults(true)
  }

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location)
    setSearchQuery(location.name)
    setShowResults(false)
    setIsSearching(false)
  }

  const clearSelection = () => {
    onLocationSelect(null)
    setSearchQuery('')
    setShowResults(false)
  }

  useEffect(() => {
    if (selectedLocation) {
      setSearchQuery(selectedLocation.name)
    }
  }, [selectedLocation])

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search for a location..."
          className="input-field pl-10 pr-10"
        />
        {selectedLocation && (
          <button
            onClick={clearSelection}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            {/* Search Results */}
            {searchQuery.length >= 2 && (
              <div className="p-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="loading-spinner w-6 h-6"></div>
                    <span className="ml-2 text-sm text-gray-500">Searching...</span>
                  </div>
                ) : searchResults && searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((location: Location, index: number) => (
                      <motion.button
                        key={`${location.lat}-${location.lng}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left p-3 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 text-gray-900"
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {location.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {location.displayName}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 && !isLoading ? (
                  <div className="text-center py-4 text-gray-600">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium">No locations found</p>
                    <p className="text-xs">Try a different search term</p>
                  </div>
                ) : null}
              </div>
            )}

            {/* Popular Locations */}
            {searchQuery.length < 2 && popularLocations && (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2 px-2">
                  Popular Locations
                </div>
                <div className="space-y-1">
                  {popularLocations.map((location: Location, index: number) => (
                    <motion.button
                      key={`popular-${location.lat}-${location.lng}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full text-left p-3 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 text-gray-900"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {location.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {location.country}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Location Display */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900">{selectedLocation.name}</div>
              <div className="text-sm text-blue-700">
                {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
