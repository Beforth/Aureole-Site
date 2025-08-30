'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Footer from '@/components/Footer'

// Event data
const upcomingEvents = [
  {
    id: 1,
    name: "Analytica 2025",
    date: "March 18-21, 2025",
    location: "Munich, Germany",
    description: "International trade fair for laboratory technology, analysis, biotechnology, and diagnostics with global industry leaders.",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    name: "P-MEC India 2025",
    date: "September 16-18, 2025",
    location: "Mumbai, India",
    description: "Premier pharmaceutical machinery and equipment exhibition showcasing cutting-edge manufacturing technology and solutions.",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    name: "CPHI Worldwide 2025",
    date: "November 4-6, 2025",
    location: "Barcelona, Spain",
    description: "World's leading pharmaceutical ingredients exhibition connecting global pharmaceutical professionals and showcasing latest innovations.",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

const pastEvents = [
  // Domestic Exhibitions
  {
    id: 1,
    name: "PharmaTech Expo Gujarat 2025",
    date: "March 15-17, 2025",
    location: "Gujarat, India",
    description: "Leading pharmaceutical technology exhibition showcasing latest innovations in pharmaceutical equipment and laboratory technology.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 2,
    name: "PharmaTech Expo – Chandigarh 2025",
    date: "April 20-22, 2025",
    location: "Chandigarh, India",
    description: "Northern India's premier pharmaceutical technology and equipment exhibition.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 3,
    name: "Pharmalab Chem Expo Goa 2025",
    date: "May 15-17, 2025",
    location: "Goa, India",
    description: "Pharmaceutical laboratory and chemical equipment exhibition in Western India.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 4,
    name: "Analytica Lab Expo Mumbai 2025",
    date: "June 10-12, 2025",
    location: "Mumbai, India",
    description: "International trade fair for laboratory technology, analysis, and biotechnology.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 5,
    name: "CPHI Pmec 2024",
    date: "July 10-12, 2024",
    location: "Mumbai, India",
    description: "World's leading pharmaceutical ingredients exhibition connecting global pharmaceutical professionals.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 6,
    name: "India Lab Expo Hyderabad",
    date: "August 5-7, 2024",
    location: "Hyderabad, India",
    description: "Southern India's premier laboratory technology and analytical equipment exhibition.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 7,
    name: "CPHI Pmec (Nov 2023)",
    date: "November 20-22, 2023",
    location: "Mumbai, India",
    description: "World's leading pharmaceutical ingredients exhibition with focus on manufacturing excellence.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 8,
    name: "India Lab Expo Mumbai",
    date: "October 15-17, 2023",
    location: "Mumbai, India",
    description: "International trade fair for laboratory technology, analysis, biotechnology, and diagnostics.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 9,
    name: "Pharmatech Expo Chandigarh",
    date: "September 10-12, 2023",
    location: "Chandigarh, India",
    description: "Northern India's premier pharmaceutical technology exhibition showcasing laboratory equipment.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  {
    id: 10,
    name: "PharmaTech Expo (Aug 2024)",
    date: "August 15-17, 2024",
    location: "Mumbai, India",
    description: "Successfully showcased our latest pharmaceutical equipment innovations and stability chambers.",
    status: "completed",
    category: "domestic",
    image: "/images/placeholder.png"
  },
  // International Exhibitions
  {
    id: 11,
    name: "Arab Pharma Manufacturers Expo – Jordan 2025",
    date: "May 10-12, 2025",
    location: "Amman, Jordan",
    description: "International pharmaceutical manufacturing exhibition in the Middle East region.",
    status: "completed",
    category: "international",
    image: "/images/placeholder.png"
  },
  {
    id: 12,
    name: "Nigeria Pharma Manufacturers Expo 2024",
    date: "April 15-17, 2024",
    location: "Lagos, Nigeria",
    description: "West African pharmaceutical manufacturing and technology exhibition.",
    status: "completed",
    category: "international",
    image: "/images/placeholder.png"
  },
  {
    id: 13,
    name: "Pharmaconex Exhibition 2024",
    date: "March 10-12, 2024",
    location: "Cairo, Egypt",
    description: "Leading pharmaceutical exhibition in Egypt showcasing pharmaceutical technology and equipment.",
    status: "completed",
    category: "international",
    image: "/images/placeholder.png"
  },
  {
    id: 14,
    name: "Nepal Pharma Expo 2024",
    date: "February 20-22, 2024",
    location: "Kathmandu, Nepal",
    description: "Nepal's premier pharmaceutical technology and equipment exhibition.",
    status: "completed",
    category: "international",
    image: "/images/placeholder.png"
  },
  {
    id: 15,
    name: "West Africa Healthcare Show (May 2024)",
    date: "May 15-17, 2024",
    location: "Lagos, Nigeria",
    description: "West African healthcare and pharmaceutical technology exhibition.",
    status: "completed",
    category: "international",
    image: "/images/placeholder.png"
  }
]

// Past events data for Past Events section
const pastEventsData = [
  {
    id: 1,
    name: "Independence Day Celebration 2025",
    date: "August 15, 2025",
    location: "Company Headquarters",
    description: "Celebrating India's independence with cultural programs and team activities.",
    status: "completed",
    image: "/images/placeholder.png"
  },
  {
    id: 2,
    name: "Women's Day Celebration 2025",
    date: "March 8, 2025",
    location: "Company Headquarters",
    description: "Honoring women's achievements and contributions in the workplace.",
    status: "completed",
    image: "/images/placeholder.png"
  },
  {
    id: 3,
    name: "Inauguration Day",
    date: "January 26, 2025",
    location: "Company Headquarters",
    description: "Celebrating the inauguration of our new facility and expansion.",
    status: "completed",
    image: "/images/placeholder.png"
  }
]

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pastExhibitionSlide, setPastExhibitionSlide] = useState(0)
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

  // Past Exhibition navigation
  const nextPastExhibition = () => {
    const maxSlides = Math.ceil(pastEvents.length / 5)
    setPastExhibitionSlide((prev) => prev < maxSlides - 1 ? prev + 1 : prev)
  }

  const prevPastExhibition = () => {
    setPastExhibitionSlide((prev) => prev > 0 ? prev - 1 : prev)
  }

  return (
    <>
      {/* Hero Section with Background Image Slideshow */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#1b243f] via-[#293546] to-[#1b243f]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: `url(${upcomingEvents[currentSlide].image})`
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="block text-white">Upcoming</span>
                <span className="block text-[#2298d2]">Events</span>
              </h1>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 max-w-4xl mx-auto shadow-lg border border-white/20">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {upcomingEvents[currentSlide].name}
                </h2>
                <p className="text-lg text-[#2298d2] font-semibold mb-2">
                  {upcomingEvents[currentSlide].date}
                </p>
                <p className="text-white/80 text-lg mb-4">
                  {upcomingEvents[currentSlide].location}
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  {upcomingEvents[currentSlide].description}
                </p>
              </div>
              
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Join us at leading pharmaceutical and laboratory technology exhibitions worldwide. Discover our latest innovations and connect with industry professionals.
              </p>
              
              {/* Dots Indicator */}
              <div className="flex justify-center gap-3">
                {upcomingEvents.map((_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                      index === currentSlide 
                        ? 'bg-[#2298d2] border-[#2298d2] scale-125' 
                        : 'bg-white/80 border-white hover:bg-white'
                    }`}
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 border border-white/20"
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 border border-white/20"
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Past Exhibition Section - Only show if there are exhibitions */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-background-off">
          <div className="w-full px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Past Exhibition</h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Explore our previous exhibition highlights and achievements.
              </p>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Left Arrow */}
              <button 
                className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full shadow-xl flex items-center justify-center hover:bg-white/20 hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-white/20"
                onClick={prevPastExhibition}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Cards Container */}
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {pastEvents.slice(pastExhibitionSlide * 5, (pastExhibitionSlide * 5) + 5).map((event, index) => (
                    <motion.div
                      key={`${event.id}-${pastExhibitionSlide}`}
                      className="glass rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300 h-full flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="event-image mb-4 overflow-hidden rounded-xl flex-shrink-0">
                        <motion.img 
                          src={event.image}
                          alt={event.name}
                          className="w-full h-48 object-cover shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{event.name}</h3>
                        <p className="text-primary-600 font-medium mb-1">{event.date}</p>
                        <p className="text-text-secondary mb-3">{event.location}</p>
                        <p className="text-text-secondary text-sm flex-grow line-clamp-3">{event.description}</p>
                        <div className="mt-auto pt-4">
                          <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                            Exhibition
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full shadow-xl flex items-center justify-center hover:bg-white/20 hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-white/20"
                onClick={nextPastExhibition}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Indicator Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(pastEvents.length / 5) }, (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === pastExhibitionSlide 
                      ? 'bg-primary-500 scale-125' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  onClick={() => setPastExhibitionSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events Section */}
      <section className="bg-background-off py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Past Events</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Relive our successful participation in major industry exhibitions and conferences.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button 
              className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full shadow-xl flex items-center justify-center hover:bg-white/20 hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-white/20"
              onClick={() => {}}
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Container */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEventsData.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="glass rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300 h-full flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="event-image mb-4 flex-shrink-0">
                      <img 
                        src={event.image}
                        alt={event.name}
                        className="w-full h-48 object-cover rounded-xl shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{event.name}</h3>
                      <p className="text-primary-600 font-medium mb-1">{event.date}</p>
                      <p className="text-text-secondary mb-3">{event.location}</p>
                      <p className="text-text-secondary text-sm flex-grow line-clamp-3">{event.description}</p>
                      <div className="mt-auto pt-4">
                        <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                          Completed
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full shadow-xl flex items-center justify-center hover:bg-white/20 hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-white/20"
              onClick={() => {}}
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
