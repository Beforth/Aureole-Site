'use client'

import { motion } from 'framer-motion'

import Footer from '@/components/Footer'

const ventures = [
  {
    title: "Mack Auraa Healthcare Pvt. Ltd.",
    subtitle: "Bettering the lives",
    description: "A dynamic and innovative player in India's animal health industry, dedicated to delivering world-class branded products. Committed to excellence, we provide cutting-edge solutions and premium healthcare products for animal well-being.",
    image: "/images/ventures/mack-auraa-logo.png",
    website: "https://mackauraa.com",
    industry: "Animal Healthcare",
    founded: "2018"
  },
  {
    title: "Aureole Process Equipment Pvt. Ltd.",
    subtitle: "We are there with you",
    description: "Established in 2005 under Dr. Kiran Badgujar's leadership, we specialize in manufacturing high-quality process equipment. With over 1000+ units supplied globally, we're renowned for autoclaves, sterilizers, and distillation plants.",
    image: "/images/ventures/aureole-process-logo.png",
    website: "https://aureoleprocess.com",
    industry: "Process Equipment",
    founded: "2005"
  },
  {
    title: "Adityam Foundation",
    subtitle: "A Ray of Hope",
    description: "Founded in 2012 by Dr. Kiran Badgujar, Adityam Foundation is dedicated to social welfare and community development. We focus on supporting families, providing rehabilitation, and improving lives through compassion-driven initiatives.",
    image: "/images/ventures/adityam-foundation-logo.png",
    website: "https://adityamfoundation.org",
    industry: "Social Welfare",
    founded: "2012",
    quote: "Adityam means the sun—and like the sun, charity too illuminates wherever it shines."
  },
  {
    title: "Swapnkiran Resort",
    subtitle: "Embracing Well-being",
    description: "A premium hospitality destination reflecting Aureole Group's vision of holistic well-being. Offering serene environments, premium facilities, and rejuvenating experiences that blend comfort, relaxation, and nature.",
    image: "/images/ventures/swapnkiran-resort-logo.png",
    website: "https://www.swapnkiranagrofarm.com/",
    industry: "Hospitality",
    founded: "2015"
  }
]

export default function AboutPage() {
  return (
    <>

      
      {/* Hero Section */}
      <section className="hero-section bg-white">
        {/* Background Elements */}
        <div className="hero-background">
          <div className="gradient-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text-container">
            <h1 className="hero-title">
              <span className="title-line">About</span>
              <span className="title-line">Aureole</span>
              <span className="title-line">Group</span>
            </h1>
            <p className="hero-subtitle">
              A dynamic family of companies spanning pharmaceutical solutions, process equipment, animal healthcare, social outreach, and hospitality—all grounded in quality, innovation, and integrity.
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="molecule-container">
              <div className="molecule-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
              <div className="molecule-center">
                <div className="molecule-stats">
                                  <div className="molecule-stat-number">28+</div>
                <div className="molecule-stat-label">years of excellence</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <div 
          className="scroll-indicator"
          onClick={() => {
            const nextSection = document.querySelector('.director-desk-section');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Director's Desk */}
      <section className="py-20 bg-background-off director-desk-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">Director's Desk</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Dr. Kiran Badgujar</h3>
              <p className="text-text-secondary">Founder & Director – Aureole Group</p>
            </div>
          </motion.div>
          
          <motion.div
            className="director-letter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="letter-content">
              <p className="letter-paragraph">
                It gives me immense pride to address you from the Director's Desk at Aureole Group. What began as a vision has today flourished into a dynamic family of companies—spanning pharmaceutical solutions, process equipment, animal healthcare, social outreach, and hospitality—all grounded in quality, innovation, and integrity.
              </p>
              
              <p className="letter-paragraph">
                With over 27 years of experience in the pharmaceutical industry, my journey has been driven by the belief that excellence is not an act, but a habit. Whether it's through cutting-edge technologies at Aureole Pharma Tech and Aureole Process Equipment, holistic care via Mack Auraa Veterinary Healthcare, community service with Adityam Foundation, or hospitality offerings like Swapnkiran Resort, our mission remains steadfast—to improve lives with purpose.
              </p>
              
              <p className="letter-paragraph">
                In 2022, we were honored with the India 500 CEO Award, and I'm thrilled to share our latest recognition: the Maharashtra Udyojakta Puraskar 2025, celebrating our entrepreneurial spirit and industry impact.
              </p>
              
              <p className="letter-paragraph">
                I firmly believe that innovation and compassion must go hand in hand. As we progress, I extend my deepest gratitude to our colleagues, partners, and clients—your trust fuels our passion and drives our vision forward.
              </p>
              
              <div className="letter-signature">
                <p className="signature-line">Warm regards,</p>
                <p className="signature-name">Dr. Kiran Badgujar</p>
                <p className="signature-title">Director – Aureole Group</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Goal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="vision-mission-grid">
            <div className="vision-section">
              <h3 className="section-title">Our Vision</h3>
              <p className="section-content">
                To be at the forefront of the pharmaceutical industry, redefining excellence through innovation, quality, and sustainability. Guided by integrity, collaboration, and visionary leadership, we aim to set the gold standard for healthcare technologies and leave a legacy of healthier lives and brighter futures.
              </p>
            </div>
            
            <div className="grid-divider"></div>
            
            <div className="mission-section">
              <h3 className="section-title">Our Mission</h3>
              <p className="section-content">
                Our mission is to lead with innovation, uphold the highest quality standards, and promote sustainability in pharmaceutical solutions. Through integrity and transparency, we strive to make a meaningful difference in people's lives with accessible and cutting-edge pharmaceutical technologies.
              </p>
            </div>
            
            <div className="grid-divider"></div>
            
            <div className="goal-section">
              <h3 className="section-title">Our Goal</h3>
              <p className="section-content">
                Our paramount goal is to revolutionize multiple industries by consistently delivering innovative solutions, advanced technologies, and unmatched quality in pharmaceutical equipment and services. We are committed to driving healthcare advancements, contributing to scientific progress, and improving lives worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ventures */}
      <section className="py-20 bg-background-off">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Our Ventures
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A diverse portfolio of companies dedicated to improving lives across multiple industries
            </p>
          </motion.div>

          <div className="ventures-grid-2x2">
            {ventures.map((venture, index) => (
              <motion.div
                key={venture.title}
                className="venture-card-horizontal"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <div className="venture-card-content">
                  <div className="venture-image-section">
                    <img 
                      src={venture.image} 
                      alt={venture.title}
                      className="venture-card-image"
                      onError={(e) => {
                        e.currentTarget.src = '/images/ventures/placeholder.png';
                      }}
                    />
                  </div>
                  <div className="venture-text-section">
                    <div className="venture-header-info">
                      <div className="venture-badge">{venture.industry}</div>
                      <h3 className="venture-title">{venture.title}</h3>
                      <p className="venture-subtitle">{venture.subtitle}</p>
                      <div className="venture-meta">
                        <span className="venture-founded">Est. {venture.founded}</span>
                        {venture.website && (
                          <a 
                            href={venture.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="venture-website"
                          >
                            Visit Website →
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="venture-description-section">
                      <p className="venture-description">{venture.description}</p>
                      
                      {venture.quote && (
                        <blockquote className="venture-quote">
                          "{venture.quote}"
                        </blockquote>
                      )}
                      

                      

                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
