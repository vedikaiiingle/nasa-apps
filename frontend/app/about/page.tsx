'use client'

import { motion } from 'framer-motion'
import { Rocket, Users, Globe, Satellite, Award, Heart } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function About() {
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
                About{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Weather Parade
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
                A NASA Space Apps Challenge project that brings Earth observation data 
                to help you plan outdoor events with confidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Rocket className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "Will It Rain On My Parade?" was created to bridge the gap between NASA's vast Earth 
                observation data and practical, everyday decision-making. We believe that everyone 
                should have access to reliable weather information to plan their outdoor activities 
                with confidence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By leveraging historical satellite data and advanced probability analysis, we provide 
                insights that help users make informed decisions about outdoor events, reducing the 
                uncertainty that comes with weather-dependent activities.
              </p>
            </div>
          </div>
        </motion.section>

        {/* NASA Space Apps Challenge Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">NASA Space Apps Challenge 2025</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                This project was developed for the NASA Space Apps Challenge, an annual international 
                hackathon where participants from around the world use NASA's open data to address 
                real-world problems on Earth and in space.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Challenge Theme</h3>
                  <p className="text-gray-700">
                    "Will It Rain On My Parade?" focuses on using Earth observation data to help 
                    people plan outdoor activities and events.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Sources</h3>
                  <p className="text-gray-700">
                    We utilize multiple NASA Earth observation datasets including satellite 
                    imagery, weather data, and atmospheric measurements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern web technologies and NASA's Earth observation APIs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Frontend</h3>
              <p className="text-gray-600 leading-relaxed">
                Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion for 
                smooth animations and responsive design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Satellite className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Backend</h3>
              <p className="text-gray-600 leading-relaxed">
                Node.js, Express.js, Redis caching, and integration with NASA's Earth 
                observation data APIs for real-time weather analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Sources</h3>
              <p className="text-gray-600 leading-relaxed">
                NASA GIBS, CMR API, OpenWeatherMap, and historical satellite data 
                for comprehensive weather probability analysis.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A passionate group of developers and data enthusiasts working to make 
              NASA's Earth observation data accessible to everyone.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Passionate Innovators</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our team consists of developers, data scientists, and Earth observation 
                enthusiasts who believe in the power of open data to solve real-world problems.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're committed to creating tools that make NASA's incredible Earth observation 
                data accessible and useful for everyday decision-making.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600 leading-relaxed">
                Making NASA's Earth observation data accessible to everyone, regardless of technical background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Leveraging cutting-edge technology to solve real-world problems with space data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Satellite className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Accuracy</h3>
              <p className="text-gray-600 leading-relaxed">
                Providing reliable, data-driven insights based on NASA's scientific observations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Building a community around the use of Earth observation data for better decision-making.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
