'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCategoryHover = (category: string) => {
    setHoveredCategory(category)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
          // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: ''
        })
        setIsModalOpen(false)
      }, 3000)
  }

        return (
    <>
      <section className="py-20 bg-background-off relative">
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

        <div className="grid lg:grid-cols-2 gap-8 relative">
          {/* Left Column - Catalogue Categories */}
          <div className="glass rounded-2xl p-8 shadow-lg">
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

          {/* Right Column - Info Content */}
          <div className="glass rounded-2xl p-8 shadow-lg">
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

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-6 max-w-3xl mx-auto shadow-lg">
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
                <a 
                  href="mailto:enquiry@aureolepharmatech.com"
                  className="text-text-secondary text-sm hover:text-primary-500 transition-colors duration-200"
                  title="Send us an email"
                >
                  enquiry@aureolepharmatech.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-primary-500" />
                <a 
                  href="tel:+918600522240"
                  className="text-text-secondary text-sm hover:text-primary-500 transition-colors duration-200"
                  title="Call us"
                >
                  +91 86005 22240
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Catalogue Request Form Modal - Outside Section */}
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-start justify-center"
          onClick={handleCloseModal}
                      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, paddingTop: '225rem' }}
        >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1b243f] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 backdrop-blur-sm relative z-[999999]"
                onClick={(e) => e.stopPropagation()}
                style={{ zIndex: 999999 }}
              >
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Request Catalogue</h3>
                      <p className="text-white/80 text-sm">Get detailed specifications for {selectedCategory}</p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-white placeholder-white/60"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-white placeholder-white/60"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-white placeholder-white/60"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Email ID *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-white placeholder-white/60"
                        placeholder="Enter your email"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full border-2 border-white/20 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </form>
                ) : (
                  /* Success Message */
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary-color/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Catalogue Request Submitted!</h3>
                    <p className="text-white/80 text-lg mb-4">
                      Thank you for your interest in {selectedCategory}. Our team will send you the detailed catalogue within 24 hours.
                    </p>
                    <p className="text-sm text-white/60">
                      You will receive a confirmation email shortly.
                    </p>
                  </div>
                )}
                            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
    )
}
