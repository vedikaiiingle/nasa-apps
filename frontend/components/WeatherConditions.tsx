'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Thermometer, 
  CloudRain, 
  Wind, 
  Eye, 
  Heart,
  Check,
  Info
} from 'lucide-react'

interface WeatherConditionsProps {
  selectedConditions: string[]
  onConditionsChange: (conditions: string[]) => void
}

interface Condition {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
  bgColor: string
  thresholds: {
    label: string
    value: string
    unit: string
  }[]
}

const conditions: Condition[] = [
  {
    id: 'temperature',
    name: 'Temperature',
    icon: Thermometer,
    description: 'Hot and cold weather conditions',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    thresholds: [
      { label: 'Very Hot', value: '>35°C', unit: '°C' },
      { label: 'Very Cold', value: '<0°C', unit: '°C' }
    ]
  },
  {
    id: 'precipitation',
    name: 'Precipitation',
    icon: CloudRain,
    description: 'Rain and wet weather conditions',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    thresholds: [
      { label: 'Very Wet', value: '>10mm', unit: 'mm' },
      { label: 'Dry', value: '<1mm', unit: 'mm' }
    ]
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: Wind,
    description: 'Windy and calm conditions',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    thresholds: [
      { label: 'Very Windy', value: '>10 m/s', unit: 'm/s' },
      { label: 'Calm', value: '<2 m/s', unit: 'm/s' }
    ]
  },
  {
    id: 'airQuality',
    name: 'Air Quality',
    icon: Eye,
    description: 'Air pollution and visibility',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200',
    thresholds: [
      { label: 'Poor', value: 'AQI >100', unit: 'AQI' },
      { label: 'Good', value: 'AQI <50', unit: 'AQI' }
    ]
  },
  {
    id: 'comfort',
    name: 'Comfort Index',
    icon: Heart,
    description: 'Overall weather comfort level',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    thresholds: [
      { label: 'Comfortable', value: '>70', unit: 'index' },
      { label: 'Uncomfortable', value: '<30', unit: 'index' }
    ]
  }
]

export function WeatherConditions({ selectedConditions, onConditionsChange }: WeatherConditionsProps) {
  const [showInfo, setShowInfo] = useState<string | null>(null)

  const handleConditionToggle = (conditionId: string) => {
    if (selectedConditions.includes(conditionId)) {
      onConditionsChange(selectedConditions.filter(id => id !== conditionId))
    } else {
      onConditionsChange([...selectedConditions, conditionId])
    }
  }

  const selectAll = () => {
    onConditionsChange(conditions.map(c => c.id))
  }

  const clearAll = () => {
    onConditionsChange([])
  }

  return (
    <div className="space-y-4">
      {/* Selection Controls */}
      <div className="flex gap-2">
        <button
          onClick={selectAll}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Select All
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={clearAll}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 gap-3">
        {conditions.map((condition, index) => {
          const Icon = condition.icon
          const isSelected = selectedConditions.includes(condition.id)
          
          return (
            <motion.div
              key={condition.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? `${condition.bgColor} border-current`
                    : 'bg-white/90 border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => handleConditionToggle(condition.id)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-current rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Condition Content */}
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/50' : 'bg-gray-100'}`}>
                  <Icon className={`w-5 h-5 ${isSelected ? condition.color : 'text-gray-500'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${isSelected ? condition.color : 'text-gray-900'}`}>
                      {condition.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowInfo(showInfo === condition.id ? null : condition.id)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {condition.description}
                  </p>

                  {/* Thresholds */}
                  <div className="flex flex-wrap gap-2">
                    {condition.thresholds.map((threshold, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-white/70 text-gray-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {threshold.label}: {threshold.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              {showInfo === condition.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-current/20"
                >
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">
                      This condition analyzes historical weather data to determine 
                      the probability of extreme weather events occurring on your selected date.
                    </p>
                    <div className="space-y-1">
                      {condition.thresholds.map((threshold, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{threshold.label}:</span>
                          <span className="font-medium">{threshold.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Selection Summary */}
      {selectedConditions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">
              {selectedConditions.length} condition{selectedConditions.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="text-sm text-blue-700">
            {selectedConditions.map(id => 
              conditions.find(c => c.id === id)?.name
            ).join(', ')}
          </div>
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
        <div className="font-medium text-gray-700 mb-1">💡 About Weather Conditions</div>
        <div>
          Select the weather conditions you want to analyze. Each condition uses 
          NASA's historical satellite data to calculate the probability of extreme 
          weather events occurring on your chosen date and location.
        </div>
      </div>
    </div>
  )
}
