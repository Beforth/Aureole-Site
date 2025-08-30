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
                  At Aureole Pharma Tech, quality is uncompromising. The organization maintains stringent regulatory compliance and holds multiple certifications that reflect global benchmarks. Its internally enforced quality control processes ensure every product dispatched is both safe and effective.
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
                  Leveraging advanced manufacturing facilities equipped with state-of-the-art technology, Aureole Pharma Tech combines skilled personnel with continuous training programs. This synergy ensures that every product aligns with the highest quality standards.
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
                <h2 className="section-title">Diverse & Innovative Product Range</h2>
                <p className="section-content">
                  From essential medications to advanced formulations, the company's portfolio is both broad and forward-thinking. Each product stems from a meticulous R&D process emphasizing safety, efficacy, and adaptability to evolving healthcare needs.
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
                <h2 className="section-title">Customer-Centric Service Philosophy</h2>
                <p className="section-content">
                  Building long-term client relationships is central to the company's strategy. By valuing customer feedback and proactively addressing needs, Aureole fosters trust and loyalty through consistent delivery and service.
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
                <h2 className="section-title">Robust Communication & After-Sales Support</h2>
                <p className="section-content">
                  Customers benefit from multiple responsive communication channels—phone, email, and online forms—ensuring efficient handling of inquiries and complaints. Post-purchase support is equally comprehensive, with warranty policies, prompt safety notifications, and customer education initiatives reinforcing the company's commitment.
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
                <h2 className="section-title">Comprehensive Product Portfolio</h2>
                <p className="section-content">
                  Aureole Pharma Tech crafts a wide array of pharmaceutical equipment, including—but not limited to—stability chambers, walk-in chambers, vertical autoclaves, cold chambers, dual-zone chambers, and tabletop instruments.
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
                <h2 className="section-title">Global Reach & Adaptability</h2>
                <p className="section-content">
                  Aureole Pharma Tech operates across diverse regulatory environments, reinforcing its international presence through strategic partnerships and collaborations that cater to a broad, global clientele.
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
                  Environmental stewardship and social performance are embedded in operations. The company undertakes ethical sourcing and production, environmental initiatives, and community-focused programs to ensure responsible and sustainable business practices.
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
