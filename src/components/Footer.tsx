'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Mail, Phone, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react'

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Software', href: '/software' },
  { name: 'Industries We Serve', href: '/about#industries' },
  { name: 'Our Team', href: '/about#team' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Careers', href: '/careers' }
]

const socialLinks = [
  { icon: Linkedin, href: 'https://in.linkedin.com/company/aureole-group-india', name: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/aureolepharma', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Twitter, href: '#', name: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top-section">
          {/* Brand */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="footer-logo">Aureole Pharma Tech</div>
            <p>Where excellence is not just a goal, it's our guiding light.</p>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="w-4 h-4" />
                <p>Plot No. B – 61, Malegaon MIDC, Tal - Sinnar, Dist - Nashik 422 113 Maharashtra, India</p>
              </div>
              <div className="contact-item">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:enquiry@aureolepharmatech.com"
                  className="hover:text-primary-500 transition-colors duration-200"
                  title="Send us an email"
                >
                  enquiry@aureolepharmatech.com
                </a>
              </div>
              <div className="contact-item">
                <Phone className="w-4 h-4" />
                <a 
                  href="tel:+918600522240"
                  className="hover:text-primary-500 transition-colors duration-200"
                  title="Call us"
                >
                  +91 86005 22240
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            className="footer-social"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h4>Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom-section">
          <div className="footer-map-section">
            {/* Map */}
            <motion.div
              className="footer-map"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h4>Get Direction</h4>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d629.2441022637547!2d73.9785072140264!3d19.88470717846!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddbbc51726bf65%3A0x1346993e205c4667!2sAureole%20Pharma-Tech%20(Mfg.of%20Stability%20Chambers%20%2C%20autoclave%20and%20table%20top%20equipments)!5e1!3m2!1sen!2sin!4v1755346213392!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="footer-quick-links"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h4>Quick Links</h4>
              <div className="quick-links-grid">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="quick-link"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <motion.div
          className="copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Aureole Pharma Tech Pvt. Ltd. All rights reserved. SEO & Web Design by Beforth ⚡</p>
        </motion.div>
      </div>
    </footer>
  )
}
