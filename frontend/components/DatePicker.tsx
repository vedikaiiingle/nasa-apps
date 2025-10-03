'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

interface DatePickerProps {
  selectedDate: string
  onDateChange: (date: string) => void
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [showPresets, setShowPresets] = useState(false)

  const presets = [
    {
      label: 'Today',
      value: new Date().toISOString().split('T')[0],
      description: 'Current date'
    },
    {
      label: 'Tomorrow',
      value: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Next day'
    },
    {
      label: 'Next Week',
      value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: '7 days from now'
    },
    {
      label: 'Next Month',
      value: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: '30 days from now'
    },
    {
      label: 'Summer Solstice',
      value: '2024-06-21',
      description: 'June 21st (Northern Hemisphere)'
    },
    {
      label: 'Winter Solstice',
      value: '2024-12-21',
      description: 'December 21st (Northern Hemisphere)'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysUntil = (dateString: string) => {
    const targetDate = new Date(dateString)
    const today = new Date()
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays === -1) return 'Yesterday'
    if (diffDays > 0) return `In ${diffDays} days`
    return `${Math.abs(diffDays)} days ago`
  }

  const getSeason = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    
    if (month >= 3 && month <= 5) return 'Spring'
    if (month >= 6 && month <= 8) return 'Summer'
    if (month >= 9 && month <= 11) return 'Autumn'
    return 'Winter'
  }

  return (
    <div className="space-y-4">
      {/* Date Input */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="input-field pl-10"
          min={new Date().toISOString().split('T')[0]}
          max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
        />
      </div>

      {/* Selected Date Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            {formatDate(selectedDate)}
          </span>
        </div>
        <div className="text-sm text-blue-700 space-y-1">
          <div className="flex justify-between">
            <span>Days until:</span>
            <span className="font-medium">{getDaysUntil(selectedDate)}</span>
          </div>
          <div className="flex justify-between">
            <span>Season:</span>
            <span className="font-medium">{getSeason(selectedDate)}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Presets */}
      <div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          Quick Select
          <motion.div
            animate={{ rotate: showPresets ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        {showPresets && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 grid grid-cols-1 gap-2"
          >
            {presets.map((preset, index) => (
              <motion.button
                key={preset.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onDateChange(preset.value)
                  setShowPresets(false)
                }}
                className={`p-2 text-left rounded-lg border transition-colors ${
                  selectedDate === preset.value
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium text-sm">{preset.label}</div>
                <div className="text-xs text-gray-600">{preset.description}</div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Date Range Info */}
      <div className="text-xs bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="font-medium text-blue-800 mb-2">💡 Tip</div>
        <div className="text-blue-700">
          You can select any date within the next year. Historical weather data 
          will be used to calculate probabilities for your chosen date.
        </div>
      </div>
    </div>
  )
}
