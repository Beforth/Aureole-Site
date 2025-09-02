'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '@/components/Footer'

const careerPositions = [
  {
    id: 'MS_S&M_EL01',
    title: 'Service Coordinator & Customer Support',
    status: 'Open',
    level: 'Mid',
    experience: '02 to 04 years of Backend support and Coordination of Sales, Customer Support and Service',
    openings: 1,
    description: [
      'Relevant experience of 02 to 04 years of Service Coordinator, Customer Relationship Management in Pharma Industry',
      'Knowledge of process improvement',
      'Prepare and Set up SOPs for Service Department',
      'Must have good communication, interpersonal and documentation skill',
      'Able to support for promotional activities',
      'Ready for cross department activities, able to support QA and QC Team',
      'Good to have experience of other industries'
    ]
  },
  {
    id: 'MS_CS&S_EL04',
    title: 'Service and Installations Engineer',
    status: 'Open',
    level: 'Senior',
    experience: '05 to 07 years in Service and Installations of Pharma Lab equipment',
    openings: 1,
    description: [
      'Relevant experience of 05 to 07 years in Service and Installations (Laboratory equipment)',
      'Experience of Installation, Service and Maintenance of Laboratory equipment',
      'Customer facing role, and able to handle all end-to-end activities of installation and service support',
      'Able to support QA and QC Department from documentation and process perspective',
      'Good to have hands on and able to support for PLC, SCADA, HMI',
      'Should ready and able to do Onsite (Customer Site) and Online (Remote) Support',
      'Should lead and guide the team of Service Engineers',
      'Must have good communication skills and proactive attitude'
    ]
  },
  {
    id: 'MS_CS&S_EL05',
    title: 'Service and Installations Engineer',
    status: 'Open',
    level: 'Mid',
    experience: '02 to 04 years in Service and Installations of Pharma Lab equipment',
    openings: 1,
    description: [
      'Relevant experience of 02 to 04 years in Service and Installation (Laboratory equipment)',
      'Experience of Installation, Service and Maintenance of Laboratory equipment',
      'Customer facing role, and able to handle all end-to-end activities of installation and service support',
      'Able to support QA and QC Department from documentation and process perspective',
      'Good to have hands on and able to support for PLC, SCADA, HMI',
      'Should ready and able to do Onsite (Customer Site) and Online (Remote) Support',
      'Should lead and guide the team of Service Engineers',
      'Must have good communication skills and proactive attitude'
    ]
  },
  {
    id: 'MS_S&M_EL10',
    title: 'Sales and Marketing Executive',
    status: 'Open',
    level: 'Mid',
    experience: '02 to 03 years of Sales and Marketing (Pharma Equipment Industry)',
    openings: 1,
    description: [
      'Relevant experience of 02 to 03 years of Sales and Marketing in Pharma Industry',
      'Should must have good communication skill and able to handle customer requirement and queries',
      'Must have experience of needed documentation in Sales and Marketing',
      'Responsible for complete cycle (end-to-end) of each enquiry / order',
      'Reporting to Regional Head, Outdoor and Travel will be must',
      'Able to support for promotional activities, and Exhibition preparation',
      'Good to have experience of other industries'
    ]
  },
  {
    id: 'MS_QC&A_EL02',
    title: 'QA, QC and Documentation Specialist',
    status: 'Open',
    level: 'Senior',
    experience: '05 to 08 years in QA, QC and Documentation',
    openings: 1,
    description: [
      'Relevant experience of 05 to 08 years in QA, QC and Documentation',
      'Proficiency in Pharma Industry Norms (21 CFR Part 11, US FDA, WHO Guidelines)',
      'Prepare and set up internal, Department wise SOPs, guidelines',
      'Handled Audits, FAT, SAT',
      'Conduct and support internal audits across departments',
      'Impart Trainings for Risk Management CORA (ICH Q9), QMS/GMP, CIF Cycles',
      'Lead QC&A Team, guide, and mentor juniors',
      'Should ready and able to do Onsite (Customer Site) and Online (Remote) Support',
      'Must have good soft skills and carry positive attitude',
      'Good to have experience of Departments in pharma industry or other domains'
    ]
  },
  {
    id: 'MS_QC&A_EL03',
    title: 'QA, QC and Documentation Specialist',
    status: 'Open',
    level: 'Mid',
    experience: '02 to 04 years in QA, QC and Documentation',
    openings: 1,
    description: [
      'Relevant experience of 02 to 04 years in QA, QC and Documentation',
      'Experience in Pharma Industry Norms (21 CFR Part 11, US FDA, WHO Guidelines)',
      'Supported during Audits, FAT, SAT',
      'Must have good soft skills and proactive attitude',
      'Good to have experience of other Departments in pharma industry or other domains',
      'Able to own the assigned task and deliver accordingly'
    ]
  },
  {
    id: 'MS_CS&S_EL06',
    title: 'Automation Engineer - PLC, SCADA, HMI',
    status: 'Open',
    level: 'Senior',
    experience: '05 to 07 years in Automation, PLC, SCADA, HMI for Pharma Lab equipment',
    openings: 1,
    description: [
      'Relevant experience 05 to 07 years in Automation, PLC, SCADA, HMI for Pharma Lab equipment',
      'Experience of Implementation, Support, Customisation and Development of PLC and SCADA',
      'Able to handle - Requirement gathering, Development Testing and Deployment',
      'Experienced for 21 CFR Part 11 compliance software and must be aware about Pharma Industry Standards',
      'Able to provide Technical Support - Onsite (Customer premise) and Online (Remote)',
      'Should ready and able to do Onsite (Customer Site) and Online (Remote) Support',
      'Must be a good Team player and able to support site and service Engineers',
      'Enable Service Engineers and impart Trainings to them',
      'Proactive and keen for upskilling',
      'Good to have Certifications and will be preferred'
    ]
  },
  {
    id: 'MS_CS&S_EL07',
    title: 'Automation Engineer - PLC, SCADA, HMI',
    status: 'Open',
    level: 'Mid',
    experience: '02 to 04 years in Automation, PLC, SCADA, HMI for Pharma Lab equipment',
    openings: 1,
    description: [
      'Relevant experience 01 to 02 years in Automation, PLC, SCADA, HMI for Pharma Lab equipment',
      'Experience of Support, Customisation and Development of PLC and SCADA',
      'Should have experience in requirement gathering, Development Testing',
      'Experienced for 21 CFR Part 11 compliance software',
      'Should be ready for and able to provide Technical Support - Onsite (Customer premise) and Online (Remote)',
      'Must be a good Team player and ready for upskilling'
    ]
  },
  {
    id: 'MS_D&PE_EL08',
    title: 'Engineering Design and Product Development',
    status: 'Open',
    level: 'Senior',
    experience: '05 to 07 years in Engineering Design and Product Development for Pharma Lab equipment',
    openings: 1,
    description: [
      'Relevant experience of 05 to 07 years in Engineering Design and Product Development for Pharma Lab equipment',
      'Experience of CATIA V5, AutoCAD and design for Pharma and Lab equipment',
      'Worked on Panel Design, Electrical System Design and Control Panel Design for Lab equipment',
      'Responsible for complete design of environment testing equipment',
      'Should have experience of Design Qualification (DQ), customized GA drawing',
      'Requirement gathering and consulting from design perspective to customer as well as production department (internal)',
      'Take care of all documentation, set up processes',
      'Take ownership of Product development from design perspective',
      'Incorporate with Production team for feasible design of machines'
    ]
  },
  {
    id: 'MS_D&PE_EL09',
    title: 'Engineering Design and Product Development',
    status: 'Open',
    level: 'Mid',
    experience: '02 to 04 years in Engineering Design and Product Development for Pharma Lab equipment',
    openings: 2,
    description: [
      'Relevant experience of 02 to 04 years in Engineering Design and Product Development for Pharma Lab equipment',
      'Experience of CATIA V5, AutoCAD and design for Pharma and Lab equipment',
      'Worked on Panel Design, Electrical System Design and Control Panel Design for Lab equipment',
      'Able to take care of Design Qualification (DQ), customized GA drawing'
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

          {/* Career Positions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusColors[position.status as keyof typeof statusColors]}`}>
                        {position.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${levelColors[position.level as keyof typeof levelColors]}`}>
                        {position.level}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">{position.experience}</p>
                    <p className="text-primary-500 text-sm font-medium">{position.openings} opening{position.openings > 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Expandable Description */}
                {selectedPosition === position.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/20"
                  >
                    <h4 className="font-semibold text-text-primary mb-3">Job Description:</h4>
                    <ul className="space-y-2">
                      {position.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                      Apply Now
                    </button>
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
