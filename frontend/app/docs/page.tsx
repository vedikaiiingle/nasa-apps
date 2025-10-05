'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Search, 
  MapPin, 
  Calendar, 
  Cloud, 
  Download, 
  HelpCircle, 
  Lightbulb, 
  AlertCircle,
  CheckCircle,
  Info,
  ExternalLink
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Documentation() {
  const quickStartSteps = [
    {
      step: 1,
      title: 'Select Location',
      description: 'Search for your event location using our intelligent search or choose from popular locations.',
      icon: MapPin
    },
    {
      step: 2,
      title: 'Pick Date',
      description: 'Choose the date for your outdoor event. You can select any date with historical data.',
      icon: Calendar
    },
    {
      step: 3,
      title: 'Choose Conditions',
      description: 'Select the weather conditions you want to analyze (temperature, precipitation, wind, etc.).',
      icon: Cloud
    },
    {
      step: 4,
      title: 'Get Results',
      description: 'View probability analysis and download your data in CSV or JSON format.',
      icon: Download
    }
  ]

  const conditionDetails = [
    {
      name: 'Temperature',
      icon: '🌡️',
      description: 'Analyze extreme temperature conditions',
      thresholds: ['Very Hot: >35°C', 'Very Cold: <0°C'],
      tips: 'Consider both high and low temperature extremes for your event planning.'
    },
    {
      name: 'Precipitation',
      icon: '🌧️',
      description: 'Assess rainfall and wet weather probability',
      thresholds: ['Very Wet: >10mm', 'Dry: <1mm'],
      tips: 'Wet conditions may affect outdoor activities and equipment.'
    },
    {
      name: 'Wind',
      icon: '💨',
      description: 'Evaluate wind conditions and patterns',
      thresholds: ['Very Windy: >10 m/s', 'Calm: <2 m/s'],
      tips: 'Strong winds can impact tents, decorations, and outdoor equipment.'
    },
    {
      name: 'Air Quality',
      icon: '👁️',
      description: 'Monitor air pollution and visibility',
      thresholds: ['Poor: AQI >100', 'Good: AQI <50'],
      tips: 'Poor air quality may affect health, especially for sensitive individuals.'
    },
    {
      name: 'Comfort Index',
      icon: '❤️',
      description: 'Overall weather comfort assessment',
      thresholds: ['Comfortable: >70', 'Uncomfortable: <30'],
      tips: 'Combines multiple factors for overall outdoor comfort evaluation.'
    }
  ]

  const faqs = [
    {
      question: 'How does Weather Parade calculate probabilities?',
      answer: 'We analyze historical NASA Earth observation data for your selected location and date. Our algorithms examine patterns from similar dates in previous years to estimate the probability of specific weather conditions occurring.'
    },
    {
      question: 'What time period does the historical data cover?',
      answer: 'Our data spans from 1979 to the present day, providing comprehensive historical coverage for accurate probability analysis.'
    },
    {
      question: 'How accurate are the probability estimates?',
      answer: 'While we cannot predict the future with 100% accuracy, our estimates are based on decades of NASA satellite data and statistical analysis. They provide valuable insights for planning purposes.'
    },
    {
      question: 'Can I use Weather Parade for commercial events?',
      answer: 'Yes! Weather Parade is free to use for both personal and commercial events. The data and analysis are provided under NASA\'s open data policies.'
    },
    {
      question: 'What file formats can I export data in?',
      answer: 'You can export your weather analysis in both CSV (for spreadsheet applications) and JSON (for developers and applications) formats.'
    },
    {
      question: 'Is the app available on mobile devices?',
      answer: 'Yes! Weather Parade is fully responsive and works on all devices including smartphones, tablets, and desktop computers.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      
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
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
                Learn how to use Weather Parade effectively and understand the science 
                behind NASA Earth observation data.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Quick Start Guide</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with Weather Parade in just four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStartSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{step.step}</span>
                    </div>
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Weather Conditions Guide */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Weather Conditions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about each weather condition and how to interpret the probability data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {conditionDetails.map((condition, index) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{condition.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{condition.name}</h3>
                    <p className="text-gray-600 mb-4">{condition.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Thresholds:</h4>
                      <ul className="space-y-1">
                        {condition.thresholds.map((threshold, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {threshold}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800">{condition.tips}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Data Sources */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">NASA Data Sources</h2>
                <p className="text-lg text-gray-600">
                  Weather Parade is powered by NASA's Earth observation missions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Primary Data Sources</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">NASA GIBS</span>
                        <p className="text-sm text-gray-600">Global Imagery Browse Services for satellite imagery</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">CMR API</span>
                        <p className="text-sm text-gray-600">Common Metadata Repository for data discovery</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Historical Weather Data</span>
                        <p className="text-sm text-gray-600">Decades of meteorological observations</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Processing</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Real-time data fetching and caching</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Statistical probability analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Historical pattern recognition</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Quality assurance and validation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <HelpCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about Weather Parade and how it works
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tips and Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Lightbulb className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Tips & Best Practices</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get the most out of Weather Parade with these helpful tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Plan Ahead</h3>
              </div>
              <p className="text-gray-600">
                Check weather probabilities well in advance to have backup plans ready. 
                Historical data shows seasonal patterns that can help with long-term planning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Consider Multiple Conditions</h3>
              </div>
              <p className="text-gray-600">
                Don't just focus on one weather condition. Analyze temperature, precipitation, 
                and wind together for a comprehensive understanding of potential weather.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Export Your Data</h3>
              </div>
              <p className="text-gray-600">
                Download your analysis results for offline reference or to share with 
                your team. The exported data includes all probability calculations.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="card p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Now that you understand how Weather Parade works, try it out for your next outdoor event!
            </p>
            <motion.a
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-6 h-6" />
              <span>Start Weather Analysis</span>
            </motion.a>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
