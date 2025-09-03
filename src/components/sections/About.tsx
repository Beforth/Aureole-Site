'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stats = [
  { value: '28+', label: 'Years Experience' },
  { value: '500+', label: 'Products Delivered' },
  { value: '50+', label: 'Countries Served' },
]

export default function About() {
  return (
    <section className="py-20 bg-background-off">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-text-secondary mb-8">
              <p>
                At <strong className="text-primary-500">Aureole Pharma Tech</strong>, we believe in the power of inspiration. Our name, <strong className="text-primary-500">"Aureole"</strong>, draws inspiration from the radiant halo or aura often associated with revered figures in spirituality. This symbolism holds a profound significance for us as our core values are inspired by it.
              </p>
              <p>
                <strong className="text-primary-500">"Aureole"</strong> represents our unwavering commitment to excellence and distinction. Just as the halo symbolizes the sacred and divine, our name embodies a commitment to upholding the highest standards of quality, integrity, and innovation in the pharmaceutical industry.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-primary-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-block bg-gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Director Card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8 max-w-sm">
              <div className="text-center">
                                 {/* Director Avatar */}
                 <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                   <img 
                     src="/images/director.png" 
                     alt="Dr. Kiran Badgujar - Director" 
                     className="w-full h-full object-fit object-center"
                   />
                 </div>
                
                <h4 className="text-xl font-semibold text-text-primary mb-1">
                  Dr. Kiran Badgujar
                </h4>
                <p className="text-primary-500 font-medium mb-6">Director</p>
                
                <div className="text-text-secondary italic">
                  "Our journey, which began as a visionary dream, has evolved into a thriving reality, radiating the aura of innovation and excellence."
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
