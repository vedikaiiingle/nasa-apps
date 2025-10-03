'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, MapPin, Clock, Users, Heart } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Contact() {
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
                Get in{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
                Have questions about Weather Parade? Want to collaborate or contribute? 
                We'd love to hear from you!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">weatherparade@nasachallenge.com</p>
                      <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-xl flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600">Global Team - NASA Space Apps Challenge</p>
                      <p className="text-sm text-gray-500 mt-1">Participants from around the world</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl flex-shrink-0">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                      <p className="text-gray-600">24-48 hours</p>
                      <p className="text-sm text-gray-500 mt-1">We're passionate about helping!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Our Journey</h2>
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="https://github.com/weather-parade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Github className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">GitHub</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://twitter.com/weatherparade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Twitter className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">Twitter</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://linkedin.com/company/weather-parade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Linkedin className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">LinkedIn</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:weatherparade@nasachallenge.com"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Mail className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">Email</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate developers and Earth observation enthusiasts working to make NASA data accessible
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Global Collaboration</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Weather Parade is developed by a diverse team of developers, data scientists, 
                and Earth observation enthusiasts participating in the NASA Space Apps Challenge. 
                Our team spans across different time zones and brings together unique perspectives 
                and expertise.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Frontend Developers</h4>
                  <p className="text-sm text-gray-600">Creating beautiful, responsive user interfaces</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Backend Engineers</h4>
                  <p className="text-sm text-gray-600">Building robust APIs and data processing systems</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Data Scientists</h4>
                  <p className="text-sm text-gray-600">Analyzing NASA data and creating probability models</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about Weather Parade and NASA Earth observation data
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate are the weather probabilities?</h3>
              <p className="text-gray-600">
                Our probabilities are based on historical NASA Earth observation data spanning decades. 
                While we can't predict the future with 100% accuracy, our analysis provides valuable 
                insights based on historical patterns and trends.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What NASA data sources do you use?</h3>
              <p className="text-gray-600">
                We utilize multiple NASA Earth observation datasets including satellite imagery from 
                GIBS, atmospheric data, and historical weather records. All data is processed through 
                NASA's official APIs and services.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is Weather Parade free to use?</h3>
              <p className="text-gray-600">
                Yes! Weather Parade is completely free to use. We believe in making NASA's Earth 
                observation data accessible to everyone, which is why we built this tool as part 
                of the NASA Space Apps Challenge.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I contribute to the project?</h3>
              <p className="text-gray-600">
                Absolutely! We welcome contributions from the community. You can find our source code 
                on GitHub and submit issues, feature requests, or pull requests. We're always looking 
                for ways to improve the application.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="card p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Join Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Help us make NASA's Earth observation data more accessible and useful for everyone. 
              Together, we can build a better understanding of our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Try Weather Parade</span>
              </motion.a>
              <motion.a
                href="https://github.com/weather-parade"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </motion.a>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
