'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface WeatherChartProps {
  weatherData: {
    conditions: {
      [key: string]: {
        [key: string]: number
      }
    }
  }
}

export function WeatherChart({ weatherData }: WeatherChartProps) {
  // Prepare data for charts
  const barChartData = Object.entries(weatherData.conditions).map(([condition, data]) => {
    const entries = Object.entries(data).filter(([key, value]) => 
      typeof value === 'number' && key !== 'threshold'
    )
    
    return {
      condition: condition.charAt(0).toUpperCase() + condition.slice(1),
      ...Object.fromEntries(entries.map(([key, value]) => [key, value]))
    }
  })

  const pieChartData = Object.entries(weatherData.conditions).flatMap(([condition, data]) =>
    Object.entries(data)
      .filter(([key, value]) => typeof value === 'number' && key !== 'threshold')
      .map(([key, value]) => ({
        name: `${condition} - ${key}`,
        value,
        condition
      }))
  )

  const colors = {
    temperature: '#ef4444',
    precipitation: '#3b82f6',
    wind: '#8b5cf6',
    airQuality: '#f59e0b',
    comfort: '#10b981'
  }

  const getColor = (condition: string) => {
    return colors[condition as keyof typeof colors] || '#6b7280'
  }

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Weather Probability Comparison
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="condition" />
              <YAxis label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value}%`, name]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px' 
                }}
              />
              {Object.keys(barChartData[0] || {}).filter(key => key !== 'condition').map((key, index) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={getColor(barChartData[0]?.condition?.toLowerCase() || '')}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Condition Distribution
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.condition)} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Probability']}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Legend
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(colors).map(([condition, color]) => (
            <div key={condition} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-white capitalize">
                {condition.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
