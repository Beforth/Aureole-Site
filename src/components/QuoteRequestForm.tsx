'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuoteRequestFormProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export default function QuoteRequestForm({ isOpen, onClose, productName }: QuoteRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: '',
    productName: productName
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        email: '',
        phone: '',
        company: '',
        quantity: '',
        message: '',
        productName: productName
      })
      onClose()
    }, 3000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
                     <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
                           className="bg-[#1b243f] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 backdrop-blur-sm"
             onClick={(e) => e.stopPropagation()}
           >
                         {/* Header */}
                           <div className="p-8 border-b border-white/20">
               <div className="flex items-center justify-between">
                 <div>
                                       <h2 className="text-3xl font-bold text-white mb-2">Request Quote</h2>
                    <p className="text-white/80">Get detailed specifications and pricing for</p>
                                                                               <p className="bg-gradient-to-r from-gray-100 to-blue-400 bg-clip-text text-transparent font-semibold text-lg">{productName}</p>
                 </div>
                                   <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Name */}
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Email */}
                       <div>
                         <label className="block text-sm font-semibold text-white mb-2">
                           Email Address *
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Phone */}
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Company */}
                       <div>
                         <label className="block text-sm font-semibold text-white mb-2">
                           Company/Organization
                         </label>
                                                                                            <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-white placeholder-white/60"
                            placeholder="Enter company name"
                          />
                      </div>

                                                        {/* Quantity */}
                   <div>
                     <label className="block text-sm font-semibold text-white mb-2">
                       Quantity Required
                     </label>
                                          <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-white placeholder-white/60"
                        placeholder="Enter quantity (e.g., 5 units)"
                      />
                   </div>

                                     {/* Product Name (Auto-filled) */}
                   <div>
                     <label className="block text-sm font-semibold text-white mb-2">
                       Product Name
                     </label>
                                         <input
                       type="text"
                       value={formData.productName}
                       disabled
                                                                                                                                                                                                                                                                                                                                                                                               className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white/60 cursor-not-allowed"
                     />
                  </div>
                </div>

                                 {/* Message */}
                 <div className="mt-6">
                   <label className="block text-sm font-semibold text-white mb-2">
                     Additional Requirements
                   </label>
                                     <textarea
                     name="message"
                     value={formData.message}
                     onChange={handleInputChange}
                     rows={4}
                                                                                                                                                                                                                                                                                                                                                               className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all resize-none text-white placeholder-white/60"
                     placeholder="Please specify any special requirements, customizations, or additional information..."
                   />
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex gap-4">
                                     <button
                     type="submit"
                     disabled={isSubmitting}
                     className="flex-1 border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                      'Submit Quote Request'
                    )}
                  </button>
                                     <button
                     type="button"
                     onClick={onClose}
                                                                                                                                                                                                                                                                                                                                                               className="px-8 py-4 border-2 border-white/20 text-white/80 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                   >
                     Cancel
                   </button>
                </div>
              </form>
            ) : (
              /* Success Message */
                             <div className="p-8 text-center">
                 <div className="w-20 h-20 bg-primary-color/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-10 h-10 text-primary-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                                   <h3 className="text-2xl font-bold text-white mb-2">Quote Request Submitted!</h3>
                  <p className="text-white/80 text-lg mb-4">
                    Thank you for your interest in {productName}. Our team will review your request and get back to you within 24-48 hours.
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
  )
}
