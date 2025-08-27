'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import Footer from '@/components/Footer'

const serviceCenters = [
  'Baddi', 'Dehradun', 'Delhi', 'Haridwar', 'Guwahati', 'Ahmedabad', 
  'Vadodara', 'Vapi', 'Pithampur', 'Nashik', 'Mumbai', 'Pune', 
  'Aurangabad', 'Goa', 'Hyderabad', 'Bangalore', 'Visakhapatnam', 'Chennai'
]



export default function ServicesPage() {

  return (
    <>

      
             {/* Hero Section */}
       <section className="hero-services bg-background-off">
         <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Services
            </h1>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              In the ever-evolving pharmaceutical landscape, quality and customer service are the cornerstones of success. 
              Aureole Pharma Pvt. Ltd. stands out as a beacon of excellence in this competitive industry.
            </p>
          </div>
        </div>
      </section>

             {/* Main Content */}
       <section className="py-20 bg-background-off">
         <div className="w-full px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Main Content */}
            <div className="space-y-12">
              {/* Quality Standards */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Quality Standards</h2>
                <p className="section-content">
                  Quality in the pharmaceutical sector is non-negotiable. At Aureole Pharma, it is defined by stringent regulatory compliance and a commitment to exceeding industry standards. The company holds numerous certifications, reflecting its adherence to global quality benchmarks. Internally, rigorous quality control processes are implemented to ensure every product that leaves the facility is safe and effective.
                </p>
              </motion.div>

              {/* Manufacturing Excellence */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Manufacturing Excellence</h2>
                <p className="section-content">
                  Aureole Pharma's manufacturing capabilities are a testament to its dedication to quality. The company boasts advanced facilities equipped with state-of-the-art technology. This, combined with a highly skilled workforce and continuous training programs, ensures that every product is manufactured to the highest standards.
                </p>
              </motion.div>

              {/* Product Range */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Product Range</h2>
                <p className="section-content">
                  The product portfolio of Aureole Pharma is both diverse and innovative. From essential medications to cutting-edge formulations, the company's offerings are developed through meticulous research and a focus on safety and efficacy. Each product is a result of a robust R&D process aimed at meeting the dynamic needs of the healthcare sector.
                </p>
              </motion.div>

              {/* Customer Service Philosophy */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Customer Service Philosophy</h2>
                <p className="section-content">
                  At the heart of Aureole Pharma's operations is a customer-centric approach. The company values customer feedback and uses it as a tool for continuous improvement. Building long-term relationships with clients is a priority, and this is achieved by consistently delivering on promises and addressing customer needs proactively.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Additional Services */}
            <div className="space-y-12">
              {/* Communication Channels */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Communication Channels</h2>
                <p className="section-content">
                  Effective communication is crucial in maintaining strong customer relationships. Aureole Pharma offers multiple channels for customers to reach out, ensuring responsiveness and efficient handling of inquiries and complaints. This commitment to open communication helps build trust and reliability.
                </p>
              </motion.div>

              {/* After-Sales Support */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">After-Sales Support</h2>
                <p className="section-content">
                  Aureole Pharma's commitment to its customers extends beyond the point of sale. Comprehensive warranty and guarantee policies, along with prompt product recalls and safety notifications, demonstrate the company's responsibility towards its products. Additionally, ongoing customer education and support are provided to ensure optimal product use.
                </p>
              </motion.div>

              {/* Global Presence */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Global Presence</h2>
                <p className="section-content">
                  Aureole Pharma's reach extends across international markets, adapting to various regulatory environments to provide quality pharmaceuticals globally. Strategic partnerships and collaborations further enhance the company's global footprint, allowing it to serve a diverse customer base effectively.
                </p>
              </motion.div>

              {/* Sustainability */}
              <motion.div
                className="service-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Sustainability & Corporate Responsibility</h2>
                <p className="section-content">
                  Sustainability is integral to Aureole Pharma's operations. The company implements numerous environmental initiatives and engages in community-focused social responsibility programs. Ethical practices in sourcing and production underscore its commitment to sustainable and responsible business operations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

             {/* Service Centers */}
       <section className="py-20 bg-background-off service-centers-section">
         <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Service Centers
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our extensive network of service centers across India ensures you have local support wherever you are.
            </p>
          </motion.div>

                     <motion.div
             className="service-centers-simple"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
           >
             {serviceCenters.map((center, index) => (
               <motion.span
                 key={center}
                 className="service-center-item"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: index * 0.03 }}
                 viewport={{ once: true }}
               >
                 {center}
                 {index < serviceCenters.length - 1 && <span className="separator">|</span>}
               </motion.span>
             ))}
           </motion.div>
        </div>
      </section>

             

      <Footer />
    </>
  )
}
