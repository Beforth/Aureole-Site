'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Footer from '@/components/Footer'

// Event data
const upcomingEvents = [
  {
    id: 1,
    name: "Pharma - Conex Egypt",
    date: "August 25-27, 2024",
    location: "Cairo, Egypt",
    description: "Leading pharmaceutical exhibition showcasing the latest innovations in pharmaceutical technology and equipment.",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    name: "Analytica Hyderabad",
    date: "August 30 - September 1, 2024",
    location: "Hyderabad, India",
    description: "International trade fair for laboratory technology, analysis, biotechnology, and diagnostics.",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    name: "CPHI Delhi",
    date: "September 5-7, 2024",
    location: "Delhi, India",
    description: "World's leading pharmaceutical ingredients exhibition connecting global pharmaceutical professionals.",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

const pastEvents = [
  {
    id: 4,
    name: "Pharma Expo 2024",
    date: "July 15-17, 2024",
    location: "Mumbai, India",
    description: "Successfully showcased our latest pharmaceutical equipment innovations.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    name: "LabTech International",
    date: "June 20-22, 2024",
    location: "Bangalore, India",
    description: "Demonstrated cutting-edge laboratory technology solutions.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    name: "BioTech Asia 2024",
    date: "May 10-12, 2024",
    location: "Singapore",
    description: "International biotechnology conference and exhibition.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 7,
    name: "MedTech Europe",
    date: "April 5-7, 2024",
    location: "Berlin, Germany",
    description: "European medical technology trade fair.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 8,
    name: "Pharma Connect 2024",
    date: "March 15-17, 2024",
    location: "Dubai, UAE",
    description: "Middle East pharmaceutical industry summit.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 9,
    name: "Lab Innovation Summit",
    date: "February 20-22, 2024",
    location: "London, UK",
    description: "Laboratory innovation and technology conference.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 10,
    name: "PharmaTech India",
    date: "January 15-17, 2024",
    location: "Chennai, India",
    description: "Pharmaceutical technology and equipment exhibition.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 11,
    name: "Global Lab Expo",
    date: "December 10-12, 2023",
    location: "Tokyo, Japan",
    description: "International laboratory equipment and technology fair.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 12,
    name: "Pharma Innovation Forum",
    date: "November 5-7, 2023",
    location: "Paris, France",
    description: "Pharmaceutical innovation and research conference.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 13,
    name: "LabTech Americas",
    date: "October 20-22, 2023",
    location: "New York, USA",
    description: "American laboratory technology and equipment exhibition.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, upcomingEvents.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Pagination logic
  const totalPages = Math.ceil(pastEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const endIndex = startIndex + eventsPerPage
  const currentEvents = pastEvents.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>

      
      {/* Hero Section with Background Image Slideshow */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url(${upcomingEvents[currentSlide].image})`
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
                             <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                 <span className="block text-text-primary">Upcoming</span>
                 <span className="block text-primary-500">Events</span>
               </h1>
              
              <div className="bg-white rounded-2xl p-8 mb-8 max-w-4xl mx-auto shadow-lg border border-gray-200">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  {upcomingEvents[currentSlide].name}
                </h2>
                <p className="text-xl text-primary-600 font-semibold mb-2">
                  {upcomingEvents[currentSlide].date}
                </p>
                <p className="text-lg text-text-secondary mb-4">
                  {upcomingEvents[currentSlide].location}
                </p>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {upcomingEvents[currentSlide].description}
                </p>
              </div>
              
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Join us at leading pharmaceutical and laboratory technology exhibitions worldwide. Discover our latest innovations and connect with industry professionals.
              </p>
            </motion.div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-20 border border-gray-200"
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-20 border border-gray-200"
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
              {upcomingEvents.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-gray-300 ${
                    index === currentSlide 
                      ? 'bg-primary-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">Past Events</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Relive our successful participation in major industry exhibitions and conferences.
            </p>
          </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {currentEvents.map((event, index) => (
               <motion.div
                 key={event.id}
                 className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 viewport={{ once: true }}
               >
                 <div className="event-image mb-4">
                   <img 
                     src={event.image}
                     alt={event.name}
                     className="w-full h-48 object-cover rounded-xl shadow-sm"
                   />
                 </div>
                 <h3 className="text-xl font-semibold text-text-primary mb-2">{event.name}</h3>
                 <p className="text-primary-600 font-medium mb-1">{event.date}</p>
                 <p className="text-text-secondary mb-3">{event.location}</p>
                 <p className="text-text-secondary text-sm">{event.description}</p>
                 <div className="mt-4">
                   <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                     Completed
                   </span>
                 </div>
               </motion.div>
             ))}
           </div>

           {/* Pagination */}
           {totalPages > 1 && (
             <motion.div 
               className="flex justify-center items-center gap-2 mt-12"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
             >
               <button
                 onClick={() => goToPage(currentPage - 1)}
                 disabled={currentPage === 1}
                 className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
               >
                 Previous
               </button>
               
               <div className="flex gap-1">
                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                   <button
                     key={page}
                     onClick={() => goToPage(page)}
                     className={`w-10 h-10 rounded-lg border transition-colors duration-200 ${
                       currentPage === page
                         ? 'bg-primary-500 text-white border-primary-500'
                         : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                     }`}
                   >
                     {page}
                   </button>
                 ))}
               </div>
               
               <button
                 onClick={() => goToPage(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
               >
                 Next
               </button>
             </motion.div>
           )}
        </div>
      </section>

      

      <Footer />
    </>
  )
}
