'use client'

import { motion } from 'framer-motion'
import { 
  Thermometer, 
  CloudRain, 
  Wind, 
  Eye, 
  Heart,
  MapPin,
  Calendar,
  Download,
  TrendingUp,
  BarChart3,
  Globe,
  Satellite,
  Smartphone,
  Zap
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Features() {
  const mainFeatures = [
    {
      icon: MapPin,
      title: 'Global Location Search',
      description: 'Search and select any location worldwide with intelligent autocomplete and reverse geocoding.',
      details: [
        'Worldwide coverage with millions of locations',
        'Smart search with location suggestions',
        'Popular locations for quick access',
        'Coordinate-based location selection'
      ]
    },
    {
      icon: Calendar,
      title: 'Flexible Date Selection',
      description: 'Choose any date for weather analysis with historical data going back decades.',
      details: [
        'Historical data from 1979 to present',
        'Future date planning capabilities',
        'Seasonal pattern analysis',
        'Custom date range selection'
      ]
    },
    {
      icon: Thermometer,
      title: 'Temperature Analysis',
      description: 'Get probability estimates for extreme temperature conditions.',
      details: [
        'Very Hot conditions (>35°C) probability',
        'Very Cold conditions (<0°C) probability',
        'Historical temperature patterns',
        'Seasonal temperature trends'
      ]
    },
    {
      icon: CloudRain,
      title: 'Precipitation Forecasting',
      description: 'Analyze rainfall probability and precipitation patterns for your event.',
      details: [
        'Very Wet conditions (>10mm) probability',
        'Dry conditions (<1mm) probability',
        'Rainfall intensity analysis',
        'Seasonal precipitation patterns'
      ]
    },
    {
      icon: Wind,
      title: 'Wind Conditions',
      description: 'Assess wind patterns and extreme wind probability for outdoor events.',
      details: [
        'Very Windy conditions (>10 m/s) probability',
        'Calm conditions (<2 m/s) probability',
        'Wind direction analysis',
        'Seasonal wind patterns'
      ]
    },
    {
      icon: Eye,
      title: 'Air Quality Analysis',
      description: 'Monitor air quality and visibility conditions for health and comfort.',
      details: [
        'Poor air quality (AQI >100) probability',
        'Good air quality (AQI <50) probability',
        'Visibility assessment',
        'Air pollution patterns'
      ]
    },
    {
      icon: Heart,
      title: 'Comfort Index',
      description: 'Overall weather comfort level assessment for outdoor activities.',
      details: [
        'Comfortable conditions (>70 index) probability',
        'Uncomfortable conditions (<30 index) probability',
        'Multi-factor comfort analysis',
        'Activity-specific recommendations'
      ]
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive weather probability analysis with detailed insights.',
      details: [
        'Multi-condition probability analysis',
        'Historical trend visualization',
        'Statistical confidence intervals',
        'Pattern recognition algorithms'
      ]
    }
  ]

  const dataFeatures = [
    {
      icon: Satellite,
      title: 'NASA Satellite Data',
      description: 'Real-time and historical data from NASA Earth observation missions.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Worldwide weather data with high-resolution satellite imagery.',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Historical Analysis',
      description: 'Decades of historical weather data for accurate probability modeling.',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Live data feeds with automatic updates and caching.',
      color: 'orange'
    }
  ]

  const exportFeatures = [
    {
      icon: Download,
      title: 'CSV Export',
      description: 'Download weather data in CSV format for spreadsheet analysis.',
      format: 'csv'
    },
    {
      icon: Download,
      title: 'JSON Export',
      description: 'Export data in JSON format for developers and applications.',
      format: 'json'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Fully responsive design that works on all devices.',
      format: 'mobile'
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
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
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Powerful{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
                Discover all the capabilities that make Weather Parade the ultimate 
                tool for planning outdoor events with confidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to make informed decisions about outdoor events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Data Sources Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">NASA Data Sources</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by NASA's Earth observation data and cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataFeatures.map((feature, index) => {
              const Icon = feature.icon
              const colorClasses = {
                blue: 'from-blue-100 to-blue-200 text-blue-600',
                green: 'from-green-100 to-green-200 text-green-600',
                purple: 'from-purple-100 to-purple-200 text-purple-600',
                orange: 'from-orange-100 to-orange-200 text-orange-600'
              }
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Export & Integration Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Export & Integration</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take your weather data with you in any format you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exportFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Technical Specifications */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                <p className="text-lg text-gray-600">
                  Built with modern technology for reliability and performance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend Technology</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Next.js 14 with App Router</li>
                    <li>• React 18 with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Framer Motion for animations</li>
                    <li>• React Query for data fetching</li>
                    <li>• Responsive design for all devices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend Technology</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Node.js with Express.js</li>
                    <li>• Redis for caching</li>
                    <li>• NASA GIBS API integration</li>
                    <li>• RESTful API architecture</li>
                    <li>• Data validation with Joi</li>
                    <li>• Comprehensive error handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="card p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Experience the power of NASA Earth observation data for your outdoor event planning.
            </p>
            <motion.a
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Try Weather Parade Now</span>
            </motion.a>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
