'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function TopNavigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/75 backdrop-blur-lg border-b border-gray-200/60 shadow-sm' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
                             <Image 
                 src="/images/logo.png" 
                 alt="Aureole Pharma Tech" 
                 width={60} 
                 height={60} 
                 className="mr-3"
               />
              <span className="text-xl font-bold text-text-primary">Aureole Pharma Tech</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors relative ${
              pathname === '/' 
                ? 'text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full' 
                : 'text-text-secondary hover:text-text-primary'
            }`}>
              Home
            </Link>
            <Link href="/about" className={`transition-colors relative ${
              pathname === '/about' 
                ? 'text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full' 
                : 'text-text-secondary hover:text-text-primary'
            }`}>
              About
            </Link>
            <div className="relative group">
              <div className={`transition-colors flex items-center relative cursor-pointer ${
                pathname.startsWith('/products') 
                  ? 'text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}>
                <Link href="/products" className="flex items-center">
                  Products
                </Link>
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-100 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="py-2">
                  <Link href="/products?product=Stability%20Chambers" className="flex items-center px-4 py-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Stability Chambers</div>
                      <div className="text-xs text-text-secondary">Environmental testing</div>
                    </div>
                  </Link>
                  
                  <Link href="/products?product=Table%20Top%20Instruments" className="flex items-center px-4 py-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Table Top Instruments</div>
                      <div className="text-xs text-text-secondary">Laboratory equipment</div>
                    </div>
                  </Link>
                  

                  
                  <div className="border-t border-gray-100 my-2"></div>
                  
                  <Link href="/products" className="flex items-center px-4 py-3 text-primary-600 hover:bg-primary-50 transition-colors">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">View All Products</div>
                      <div className="text-xs text-text-secondary">Complete catalog</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/services" className={`transition-colors relative ${
              pathname === '/services' 
                ? 'text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full' 
                : 'text-text-secondary hover:text-text-primary'
            }`}>
              Services
            </Link>
            <Link href="/software" className={`transition-colors relative ${
              pathname === '/software' 
                ? 'text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full' 
                : 'text-text-secondary hover:text-text-primary'
            }`}>
              Software
            </Link>
            <Link href="/events" className={`transition-colors relative ${
              pathname === '/events' 
                ? 'text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full' 
                : 'text-text-secondary hover:text-text-primary'
            }`}>
              Events
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>


        </div>
      </div>
    </nav>
  )
}
