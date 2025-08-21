'use client'

import { useState } from 'react'
import { Download, CheckCircle, X, MapPin, Mail, Phone } from 'lucide-react'

const catalogueCategories = [
  'Stability Chambers',
  'Process Equipment',
  'Table Top Instruments',
  'Microbial Air Sampler',
  'Pump Series',
  'Aluminium ROPP Caps',
]

const categoryInfo = {
  'Stability Chambers': {
    title: 'Stability Chambers',
    description: 'Advanced environmental chambers for pharmaceutical stability testing. Features precise temperature and humidity control, ICH compliant, with data logging and monitoring systems.'
  },
  'Process Equipment': {
    title: 'Process Equipment',
    description: 'Complete range of pharmaceutical processing equipment including reactors, dryers, granulators, and coating systems for efficient drug manufacturing.'
  },
  'Table Top Instruments': {
    title: 'Table Top Instruments',
    description: 'Compact laboratory instruments for quality control and research. Includes pH meters, conductivity meters, viscometers, and analytical equipment.'
  },
  'Microbial Air Sampler': {
    title: 'Microbial Air Sampler',
    description: 'High-efficiency air sampling systems for microbiological monitoring in clean rooms and controlled environments. Compliant with international standards.'
  },
  'Pump Series': {
    title: 'Pump Series',
    description: 'Reliable pumping solutions for pharmaceutical applications. Includes peristaltic pumps, gear pumps, and diaphragm pumps with precise flow control.'
  },
  'Aluminium ROPP Caps': {
    title: 'Aluminium ROPP Caps',
    description: 'Roll-on pilfer-proof caps for pharmaceutical bottles. Tamper-evident, child-resistant, and compliant with international packaging standards.'
  }
}

const infoFeatures = [
  'In-depth product specifications & dimensions',
  'Verified certifications and compliance standards',
  'Technical performance data',
  'Installation and operational guidelines',
  'Transparent pricing details',
  'Warranty & service coverage',
]

export default function Catalogue() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [hoveredCategory, setHoveredCategory] = useState('')

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCategoryHover = (category: string) => {
    setHoveredCategory(category)
  }

  return (
    <section className="py-20 bg-white" style={{backgroundColor: '#ffffff'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Download The Catalogue
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Get comprehensive product information with our detailed catalogues
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 relative shadow-2xl rounded-2xl">
          {/* Left Page - Catalogue Categories */}
          <div className="bg-white rounded-l-2xl p-8 border-r-2 border-gray-300 shadow-lg relative overflow-hidden">
            {/* Paper Fold Effect - Left */}
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-200/50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-gray-300/30 to-transparent"></div>
            
            {/* Paper Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/20 to-gray-100/10 opacity-60"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Product Catalogues
                </h3>
                <p className="text-text-secondary text-sm">
                  Click any category to request detailed catalogue
                </p>
              </div>

              <div className="space-y-3">
                {catalogueCategories.map((category, index) => (
                  <button
                    key={category}
                    className="w-full text-left p-3 rounded-lg bg-primary-50/50 hover:bg-primary-100/70 transition-all duration-300 group border border-primary-200/30 relative"
                    onClick={() => handleCategoryClick(category)}
                    onMouseEnter={() => handleCategoryHover(category)}
                    onMouseLeave={() => setHoveredCategory('')}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary group-hover:text-primary-600 transition-colors">
                        {category}
                      </span>
                      <Download className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Page - Info Content */}
          <div className="bg-white rounded-r-2xl p-8 border-l-2 border-gray-300 shadow-lg relative overflow-hidden">
            {/* Paper Fold Effect - Right */}
            <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200/50 to-transparent"></div>
            <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-gray-300/30 to-transparent"></div>
            
            {/* Paper Texture */}
            <div className="absolute inset-0 bg-gradient-to-bl from-white via-gray-50/20 to-gray-100/10 opacity-60"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {hoveredCategory ? categoryInfo[hoveredCategory as keyof typeof categoryInfo]?.title || 'Product Insights' : 'Product Insights'}
              </h3>
              <p className="text-text-secondary mb-4 text-sm">
                {hoveredCategory ? categoryInfo[hoveredCategory as keyof typeof categoryInfo]?.description || 'Get complete clarity on every solution we offer.' : 'Get complete clarity on every solution we offer.'}
              </p>

              <div>
                <h4 className="text-base font-semibold text-text-primary mb-3">
                  You'll Discover:
                </h4>
                <ul className="space-y-2">
                  {infoFeatures.map((feature, index) => (
                    <li
                      key={feature}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Need Immediate Assistance?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-text-secondary text-sm">Nashik, Maharashtra</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="text-text-secondary text-sm">enquiry@aureolepharmatech.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-primary-500" />
                <span className="text-text-secondary text-sm">+91 86005 22240</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogue Request Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="glass rounded-2xl p-6 max-w-md w-full relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-text-primary">
                Request Catalogue
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Email ID *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-primary text-white py-2 rounded-lg font-semibold"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
