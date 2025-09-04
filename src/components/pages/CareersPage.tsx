'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '@/components/Footer'

const careerPositions = [
  {
    id: 'SE_MID_001',
    title: 'Service Engineer',
    status: 'Open',
    level: 'Mid',
    experience: '1–5 years (Pharma industry or Pharma equipment line)',
    openings: 2,
    qualification: [
      'B.E – Electrical / Instrumentation / Electronics / Mechanical',
      'Diploma – Electrical / Instrumentation / Electronics / Mechanical',
      'B.Sc. – Electronics or Physics',
      'ITI – Electrical / Refrigeration'
    ],
    description: [
      'Installation, Service, AMC, Calibration, and Maintenance of Laboratory Equipment',
      'Handle complete end-to-end installation and service support',
      'Strong technical background in Electrical, Electronics, and Refrigeration',
      'Understand product technical specifications, functionality, and applications',
      'Basic knowledge of PLC & HMI is preferred',
      'Knowledge of electrical components: Contactor, Sensor, Timer, Temperature Controller, SSR, SMPS, MCB, Electrical Wiring',
      'Customer-facing role, including remote support for client queries',
      'Support QA and QC departments with documentation and process requirements',
      'Good communication, interpersonal, and computer skills (MS Excel, PowerPoint, Word)',
      'Outdoor role with travel as per requirement',
      'High ethical standards, positive attitude, and adherence to company policies'
    ]
  },
  {
    id: 'SE_JUNIOR_002',
    title: 'Service Engineer (Junior)',
    status: 'Open',
    level: 'Junior',
    experience: '0–1 years (Pharma industry or Pharma equipment line)',
    openings: 3,
    qualification: [
      'B.E – Electrical / Instrumentation / Electronics / Mechanical',
      'Diploma – Electrical / Instrumentation / Electronics / Mechanical',
      'B.Sc. – Electronics or Physics',
      'ITI – Electrical / Refrigeration'
    ],
    description: [
      'Assist in Installation, Service, AMC, Calibration, and Maintenance of Laboratory Equipment',
      'Support in end-to-end installation and service activities',
      'Technical background in Electrical, Electronics, and Refrigeration',
      'Understanding of product specifications, functions, and applications',
      'Basic PLC & HMI knowledge (preferred)',
      'Familiarity with electrical components: Contactor, Sensor, Timer, Temperature Controller, SSR, SMPS, MCB, Electrical Wiring',
      'Customer support role (including remote assistance)',
      'Assist QA and QC departments with documentation support',
      'Good communication, interpersonal, and computer skills (MS Excel, PowerPoint, Word)',
      'Outdoor role with travel as per requirement',
      'Positive attitude, ethics, and adherence to company policies'
    ]
  },
  {
    id: 'SM_MID_003',
    title: 'Sales & Marketing (Mid-Level)',
    status: 'Open',
    level: 'Mid',
    experience: '2–5 years (Pharma Industry or Pharma Equipment line – Stability, Lab Equipment, Autoclaves, Pharma Equipment)',
    openings: 2,
    qualification: [
      'MBA (Marketing) with background in:',
      'Electrical / Instrumentation / Electronics / Mechanical OR',
      'B. Pharmacy'
    ],
    description: [
      'Manage complete Sales cycle: Enquiry → Order Generation → Order Closure',
      'Prepare and manage documentation (Quotations, Work Orders)',
      'Handle end-to-end responsibility for each enquiry/order',
      'Participate in outdoor client visits and frequent travel',
      'Support promotional activities & exhibition preparation',
      'Understand product specifications, applications, and technical aspects',
      'Strong communication, interpersonal, and computer skills (MS Excel, PowerPoint, Word)',
      'Outdoor job with travel as per schedule',
      'High ethical values, right attitude, and adherence to company policies'
    ]
  },
  {
    id: 'SM_JUNIOR_004',
    title: 'Sales & Marketing (Junior)',
    status: 'Open',
    level: 'Junior',
    experience: '0–2 years (Pharma Industry or Pharma Equipment line – Stability, Lab Equipment, Autoclaves, Pharma Equipment)',
    openings: 2,
    qualification: [
      'MBA (Marketing) with background in:',
      'Electrical / Instrumentation / Electronics / Mechanical OR',
      'B. Pharmacy'
    ],
    description: [
      'Assist in complete Sales cycle: Enquiry → Order Generation → Order Closure',
      'Support documentation requirements (Quotations, Work Orders)',
      'Assist in managing end-to-end enquiry/order responsibilities',
      'Participate in outdoor client visits and travel',
      'Support promotional activities & exhibitions',
      'Understand product specifications, functions, and applications',
      'Strong communication, interpersonal, and computer skills (MS Excel, PowerPoint, Word)',
      'Outdoor job with travel as per schedule',
      'Positive attitude, ethics, and adherence to company policies'
    ]
  }
]

const statusColors = {
  'Open': 'bg-green-500',
  'In Progress': 'bg-yellow-500',
  'On-Hold': 'bg-orange-500',
  'Closed': 'bg-red-500',
  'Canceled': 'bg-gray-500'
}

const levelColors = {
  'Junior': 'bg-blue-500',
  'Mid': 'bg-purple-500',
  'Senior': 'bg-indigo-500',
  'Lead': 'bg-pink-500'
}

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterLevel, setFilterLevel] = useState<string>('All')

  const filteredPositions = careerPositions.filter(position => {
    const statusMatch = filterStatus === 'All' || position.status === filterStatus
    const levelMatch = filterLevel === 'All' || position.level === filterLevel
    return statusMatch && levelMatch
  })

  const uniqueStatuses = ['All', ...Array.from(new Set(careerPositions.map(p => p.status)))]
  const uniqueLevels = ['All', ...Array.from(new Set(careerPositions.map(p => p.level)))]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-off py-20 lg:py-32">
        <div className="w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="block">Join Our</span>
              <span className="block text-primary-500">Team</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Be part of a team that's revolutionizing pharmaceutical technology and laboratory equipment innovation
            </p>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                  <p className="text-text-secondary">Work on cutting-edge pharmaceutical technology</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Growth</h3>
                  <p className="text-text-secondary">Continuous learning and career development</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Impact</h3>
                  <p className="text-text-secondary">Make a difference in healthcare technology</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="bg-background-off py-20">
        <div className="w-full px-6">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Career Opportunities</h2>
            <p className="text-text-secondary text-lg max-w-3xl">
              Join our dynamic team and contribute to the future of pharmaceutical laboratory equipment and technology.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="mb-8 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-text-secondary mb-2">Filter by Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 min-w-[140px] text-center cursor-pointer hover:bg-white/15 hover:border-white/40"
                >
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status} className="bg-gray-800 text-text-primary py-2">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-text-secondary mb-2">Filter by Level</label>
                <select 
                  value={filterLevel} 
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 min-w-[140px] text-center cursor-pointer hover:bg-white/15 hover:border-white/40"
                >
                  {uniqueLevels.map(level => (
                    <option key={level} value={level} className="bg-gray-800 text-text-primary py-2">
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Career Positions List */}
          <div className="space-y-0">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                className="border-b border-white/5 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                layout
              >
                {/* Position Header */}
                <div 
                  className="py-6 cursor-pointer hover:bg-white/5 transition-colors duration-200"
                  onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-text-primary mb-1">{position.title}</h3>
                      <p className="text-text-secondary mb-3">{position.experience}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>Full-time</span>
                        <span>•</span>
                        <span>On-site & Remote</span>
                        <span>•</span>
                        <span className={`inline-flex items-center gap-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusColors[position.status as keyof typeof statusColors]}`}></span>
                          {position.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary-500 group">
                      <span className="text-sm group-hover:text-primary-400 transition-colors">
                        {selectedPosition === position.id ? 'Hide' : 'View'}
                      </span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ease-out group-hover:text-primary-400 ${selectedPosition === position.id ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {selectedPosition === position.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ 
                      duration: 0.25, 
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.15 }
                    }}
                    className="border-t border-white/5"
                  >
                    <div className="py-6 space-y-6">
                      {/* Qualifications */}
                      {position.qualification && (
                        <div>
                          <h4 className="text-base font-medium text-text-primary mb-3">Qualifications</h4>
                          <div className="space-y-1">
                            {position.qualification.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-sm text-text-secondary">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Job Description */}
                      <div>
                        <h4 className="text-base font-medium text-text-primary mb-3">Responsibilities</h4>
                        <div className="space-y-1">
                          {position.description.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm text-text-secondary">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="pt-2">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200">
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="bg-background-off py-20">
        <div className="w-full px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-16 text-center">Application Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit Application</h3>
                <p className="text-text-secondary text-sm">Upload your resume and fill out the application form</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Review Process</h3>
                <p className="text-text-secondary text-sm">Our HR team reviews your application and experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Interview</h3>
                <p className="text-text-secondary text-sm">Technical and HR interviews to assess fit</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-500">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Offer & Onboarding</h3>
                <p className="text-text-secondary text-sm">Welcome to the Aureole PharmaTech family!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background-off py-20">
        <div className="w-full px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Contact Us to Experience the Difference</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-text-secondary text-sm text-center">
                    Plot No. B – 61, Malegaon MIDC, Tal - Sinnar, Dist - Nashik 422 113 Maharashtra, India
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-text-secondary text-sm">connect@aureolepharmatech.com</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-text-secondary text-sm">+91 86248 58551</p>
                </div>
              </div>
              
              <button className="mt-8 bg-transparent border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-500/10 hover:text-white transition-all duration-300 w-full shadow-sm hover:shadow-md">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
