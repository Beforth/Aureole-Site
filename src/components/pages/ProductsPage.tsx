'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

import Footer from '@/components/Footer'
import QuoteRequestForm from '@/components/QuoteRequestForm'

// ========================================
// PRODUCT INFORMATION DATA - Static content for product categories
// ========================================
const productInfo = {
  stabilityChambers: {
    title: "Stability Chambers",
    subtitle: "Environmental Control Solutions",
    description: "Stability chambers are precision-engineered environmental control systems designed to provide accurate and consistent temperature and humidity conditions. They play a vital role in the pharmaceutical industry, ensuring that products maintain their quality, safety, and efficacy throughout their intended shelf life.",
    when: [
      "For long-term, intermediate, and accelerated stability studies",
      "During drug development to study formulation behavior",
      "Prior to regulatory submissions where stability data is mandatory",
      "At batch release to validate product quality and consistency",
      "Throughout the product lifecycle for ongoing quality assurance"
    ],
    why: [
      "Ensure compliance with ICH, FDA, and global standards",
      "Generate reliable data to establish product shelf life",
      "Preserve potency, safety, and visual integrity of pharmaceuticals",
      "Protect patient safety by detecting degradation risks early",
      "Guarantee reproducible test conditions for regulatory audits",
      "Maintain data integrity with 21 CFR Part 11–compliant systems"
    ],
    where: [
      "Pharmaceutical manufacturing facilities – stability validation",
      "R&D laboratories – drug innovation and formulation studies",
      "Quality control departments – compliance-driven monitoring",
      "Regulatory testing centers – independent product evaluations",
      "Biotechnology companies – biomolecule and vaccine stability testing",
      "Academic research centers – pharmaceutical development studies",
      "Contract testing laboratories – outsourced stability projects"
    ]
  },
  tableTopInstruments: {
    title: "Table Top Instruments",
    subtitle: "Laboratory Equipment",
    description: "Table top instruments are compact, versatile laboratory devices designed to support a wide range of quality control, research, and testing applications. With precise temperature regulation, agitation, cleaning, and analytical support, these instruments are essential tools for maintaining accuracy, compliance, and efficiency in modern laboratories.",
    when: [
      "In analytical labs for precise incubation and agitation",
      "For ultrasonic cleaning of delicate lab equipment",
      "During sample preparation in pharmaceutical testing",
      "When research protocols require reproducibility and accuracy",
      "For training and demonstration in educational labs"
    ],
    why: [
      "Deliver accuracy, efficiency, and reliability in compact form",
      "Minimize human error with automated controls",
      "Support GLP and international compliance standards",
      "Enhance research reproducibility and workflow efficiency",
      "Provide cost-effective performance across diverse applications"
    ],
    where: [
      "Pharmaceutical QC and R&D laboratories",
      "Contract testing organizations (CROs/CTOs)",
      "Academic institutions and training centers",
      "Biotechnology and medical device companies",
      "Food, beverage, and environmental testing labs"
    ]
  }
}

// ========================================
// PRODUCT CATEGORIES DATA - Structure for the overview page
// ========================================
const productCategories = [
  {
    title: "Stability Chambers",
    subtitle: "Environmental Control Solutions",
    description: "Advanced environmental chambers for pharmaceutical stability testing with precise temperature and humidity control.",
    subcategories: [
      {
        name: "Walk In Chambers",
        types: [
          "Walk In Humidity Chamber",
          "Walk In Cold Chamber",
          "Walk In BOD Incubator",
          "Walk In Deep Freezer"
        ]
      },
      {
        name: "Humidity & Stability",
        types: [
          "Humidity Chamber / Stability Chamber",
          "Photostability Chamber"
        ]
      },
      {
        name: "Incubators & Ovens",
        types: [
          "BOD Incubator",
          "Hot Air Oven",
          "Vacuum Oven",
          "Muffle Furnace"
        ]
      },
      {
        name: "Temperature Control",
        types: [
          "Cold Chamber",
          "Deep Freezer (upto -20°C / upto -40°C)",
          "Ultra Low Deep Freezer (-80°C)",
          "Pharma Refrigerator / Dual Zone Chamber"
        ]
      }
    ]
  },
  {
    title: "Table Top Instruments",
    subtitle: "Laboratory Equipment",
    description: "Compact laboratory instruments for quality control and research applications.",
    subcategories: [
      {
        name: "Ultrasonic Baths",
        types: [
          "Eco Series",
          "Prime Series",
          "Prime Series with Chilling",
          "Prime Series with Advance Controlling",
          "Prime Series with Heating & Shaking",
          "Industrial Series"
        ]
      },
      {
        name: "Water Baths",
        types: [
          "Constant",
          "Circulating",
          "Steam Bath",
          "Oil Bath",
          "Dry Bath",
          "Chilled Circulating Bath"
        ]
      },
      {
        name: "Refrigerated Circular Bath",
        types: []
      },
      {
        name: "Air Sampler",
        types: [
          "Basic Model",
          "21 CFR Model"
        ]
      },
      {
        name: "Stainless Steel Items & Accessories",
        types: []
      }
    ]
  }
]

// ========================================
// MAIN COMPONENT - ProductsPage
// ========================================
export default function ProductsPage() {
  // ========================================
  // HOOKS AND STATE MANAGEMENT
  // ========================================
  const router = useRouter()  // Next.js router for navigation
  const searchParams = useSearchParams()  // Get URL parameters (e.g., ?product=Stability%20Chambers)
  
  // State for managing the UI and user interactions
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)  // Which category is expanded on overview page
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)  // Which main product category is selected (e.g., "Stability Chambers")
  const [selectedIndividualProduct, setSelectedIndividualProduct] = useState<any>(null)  // Which specific product is selected (e.g., "Humidity Chamber")
  const [showFooter, setShowFooter] = useState(false)  // Whether to show footer (hidden during transitions)
  const [expandedSubtypes, setExpandedSubtypes] = useState<string | null>(null)  // Which subtype dropdown is expanded in sidebar
  const [showQuoteForm, setShowQuoteForm] = useState(false)  // Whether to show the quote request form
  const [showAllFeatures, setShowAllFeatures] = useState(false)  // Whether to show all features or just first few
  
  // Reference to the detail view container for scroll management
  const detailViewRef = useRef<HTMLDivElement>(null)

  // ========================================
  // URL PARAMETER HANDLING - When page loads or URL changes
  // ========================================
  useEffect(() => {
    // Get product parameters from URL (e.g., ?product=Stability%20Chambers&individual=Humidity%20Chamber)
    const productType = searchParams.get('product')
    const individualProduct = searchParams.get('individual')
    
    // Debug: Log what we found in the URL
    console.log('🔍 ProductsPage Debug:', { 
      productType, 
      individualProduct, 
      pathname: window.location.pathname,
      fullUrl: window.location.href,
      searchParams: searchParams.toString()
    })
    
    // CASE 1: URL has a product parameter (e.g., ?product=Stability%20Chambers)
    if (productType) {
      console.log('✅ Setting selectedProduct:', productType)
      setSelectedProduct(productType)  // Show the product detail view with sidebar
      setShowFooter(true)  // Show footer for detail pages
      
      // CASE 1A: URL also has an individual product (e.g., ?product=Stability%20Chambers&individual=Humidity%20Chamber)
      if (individualProduct) {
        console.log('🔍 Looking for individual product:', individualProduct)
        const category = productDetails[productType as keyof typeof productDetails]
        if (category) {
          // First, look for the product in the main products list
          let foundProduct = category.products.find(p => p.name === individualProduct)
          
          // If not found in main products, search in the subtypes (dropdown items)
          if (!foundProduct) {
            for (const product of category.products) {
              if ((product as any).subtypes) {
                const foundSubtype = (product as any).subtypes.find((subtype: any) => subtype.name === individualProduct)
                if (foundSubtype) {
                  foundProduct = foundSubtype
                  break
                }
              }
            }
          }
          
          // If we found the individual product, select it
          if (foundProduct) {
            console.log('✅ Found and setting individual product:', foundProduct.name)
            setSelectedIndividualProduct(foundProduct)
          } else {
            console.log('❌ Individual product not found:', individualProduct)
          }
        }
      }
    } 
    // CASE 2: URL has no product parameter (e.g., just /products)
    else {
      console.log('🔄 No product parameter - clearing selection')
      // Clear all product selections and show the overview page
      setSelectedProduct(null)
      setSelectedIndividualProduct(null)
      setShowFooter(false)
    }
  }, [searchParams])  // Run this effect whenever URL parameters change

  // ========================================
  // UTILITY FUNCTIONS - Helper functions for user interactions
  // ========================================
  
  // Toggle category expansion on the overview page (expand/collapse product categories)
  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index)
  }

  // Handle clicking "View Products" button - navigates to product detail view
  const handleViewProducts = (productType: string) => {
    // Force scroll to top immediately when button is clicked (ensures user sees the top of the page)
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Hide footer initially during the transition (prevents layout shift)
    setShowFooter(false)
    
    // Set the selected product and clear any individual product selection
    setSelectedProduct(productType)
    setSelectedIndividualProduct(null)
    
    // Update the URL to reflect the selected product (for bookmarking and sharing)
    router.push(`/products?product=${encodeURIComponent(productType)}`)
    
    // Show footer after a delay to ensure content is rendered first (smooth transition)
    setTimeout(() => {
      setShowFooter(true)
    }, 100)
  }

  // ========================================
  // SCROLL MANAGEMENT - Ensure proper scroll position when navigating
  // ========================================
  
  // Scroll to top when individual product detail page loads (ensures user sees the top)
  useEffect(() => {
    if (selectedIndividualProduct) {
      const scrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      
      // Immediate scroll (for instant feedback)
      scrollToTop()
      
      // Use requestAnimationFrame for next frame (ensures DOM is ready)
      requestAnimationFrame(scrollToTop)
      
      // Additional attempts with delays (handles edge cases where scroll doesn't work immediately)
      const timers = [
        setTimeout(scrollToTop, 10),
        setTimeout(scrollToTop, 50),
        setTimeout(scrollToTop, 100),
        setTimeout(scrollToTop, 200),
        setTimeout(scrollToTop, 500)
      ]
      
      return () => timers.forEach(timer => clearTimeout(timer))
    }
  }, [selectedIndividualProduct])

  // Scroll to top when entering product detail view (when main product category changes)
  useEffect(() => {
    if (selectedProduct) {
      const scrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      
      // Immediate scroll (for instant feedback)
      scrollToTop()
      
      // Use requestAnimationFrame for next frame (ensures DOM is ready)
      requestAnimationFrame(scrollToTop)
      
      // Additional attempts with delays (handles edge cases where scroll doesn't work immediately)
      const timers = [
        setTimeout(scrollToTop, 10),
        setTimeout(scrollToTop, 50),
        setTimeout(scrollToTop, 100),
        setTimeout(scrollToTop, 200),
        setTimeout(scrollToTop, 500)
      ]
      
      return () => timers.forEach(timer => clearTimeout(timer))
    }
  }, [selectedProduct])

  // Additional effect to ensure scroll to top when detail view is shown
  useEffect(() => {
    if (selectedIndividualProduct) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [selectedIndividualProduct])

  // Force scroll to top when detail view first renders (ensures proper scroll position)
  useEffect(() => {
    if (selectedProduct && !selectedIndividualProduct) {
      // Force scroll to top when entering detail view
      const forceScrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      
      // Immediate scroll (for instant feedback)
      forceScrollToTop()
      
      // Multiple attempts with different timing (handles edge cases)
      const timers = [
        setTimeout(forceScrollToTop, 0),
        setTimeout(forceScrollToTop, 10),
        setTimeout(forceScrollToTop, 50),
        setTimeout(forceScrollToTop, 100),
        setTimeout(forceScrollToTop, 200)
      ]
      
      return () => timers.forEach(timer => clearTimeout(timer))
    }
  }, [selectedProduct, selectedIndividualProduct])

  // ========================================
  // NAVIGATION FUNCTIONS - Handle back navigation and product selection
  // ========================================
  
  // Handle "Back to Products" button click - returns to overview page
  const handleBackToProducts = () => {
    setSelectedProduct(null)  // Clear main product selection
    setSelectedIndividualProduct(null)  // Clear individual product selection
    setShowFooter(false)  // Hide footer during transition
    
    // Clear URL parameters (return to clean /products URL)
    router.push('/products')
  }

  // Handle selecting an individual product from the sidebar (keeps dropdown open for better UX)
  const handleSelectIndividualProduct = (product: any) => {
    setSelectedIndividualProduct(product)
    
    // Keep the dropdown open by ensuring the parent product's dropdown stays expanded
    if (selectedProduct) {
      // Find the parent product that contains this individual product
      const parentProduct = productDetails[selectedProduct as keyof typeof productDetails]?.products?.find(p => 
        p.name === product.name || (p.subtypes && p.subtypes.some(sub => sub.name === product.name))
      )
      
      // Keep the dropdown open for the parent product (better UX - user can easily switch between subtypes)
      if (parentProduct) {
        setExpandedSubtypes(parentProduct.name)
      }
      
      // Update URL to include the individual product (for bookmarking and sharing)
      router.push(`/products?product=${encodeURIComponent(selectedProduct)}&individual=${encodeURIComponent(product.name)}`)
    }
  }

  // Toggle subtype dropdown expansion in the sidebar (expand/collapse product subtypes)
  const toggleSubtype = (subtypeName: string) => {
    setExpandedSubtypes(expandedSubtypes === subtypeName ? null : subtypeName)
  }

  // ========================================
  // PRODUCT DETAILS DATA - Comprehensive product information from Aureole Pharma Tech
  // ========================================
  const productDetails = {
    "Stability Chambers": {
      products: [
        {
          name: "Stand Alone Chambers",
          description: "Compact and versatile standalone chambers for various laboratory applications.",
          subtypes: [
            {
              name: "Humidity Chamber / Stability Chamber",
              description: "Humidity chambers play a crucial role in a wide array of industries, including electronics, military and defense, pharmaceuticals, transportation, medical devices, shipping, and communications.",
              image: "/images/products/humidity-chamber-stability-chamber.png",
              features: [
                "Precise humidity control",
                "Compact design",
                "User-friendly interface",
                "Compliance with standards"
              ],
              specifications: {
                "Temperature Range": "20°C to 60°C",
                "Humidity Range": "40% to 95% RH",
                "Temperature Accuracy": "± 0.2°C",
                "Humidity Accuracy": "± 2.0% RH",
                "Temperature Uniformity": "± 1.0°C",
                "Humidity Uniformity": "± 3.0% RH",
                "Test Conditions": "25°C & 60% RH, 30°C & 65% RH, 40°C & 75% RH, 30°C & 75% RH",
                "Low Conditions": "25°C & 40% RH, 40°C & 25% RH, 30°C & 35% RH"
              },
              models: [
                {
                  model: "AP_SA_HC-2.0_V**",
                  capacity: "200",
                  interior: { width: "660", depth: "450", height: "700" },
                  exterior: { width: "785", depth: "1130", height: "1360" },
                  trays: "2",
                  powerSupply: ""
                },
                {
                  model: "AP_SA_HC-4.0_V**",
                  capacity: "400",
                  interior: { width: "700", depth: "650", height: "900" },
                  exterior: { width: "825", depth: "1330", height: "1560" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_HC-6.0_V**",
                  capacity: "600",
                  interior: { width: "750", depth: "750", height: "1075" },
                  exterior: { width: "875", depth: "1430", height: "1735" },
                  trays: "3",
                  powerSupply: "230 V"
                },
                {
                  model: "AP_SA_HC-8.0_V**",
                  capacity: "800",
                  interior: { width: "750", depth: "750", height: "1425" },
                  exterior: { width: "875", depth: "1480", height: "2085" },
                  trays: "4",
                  powerSupply: ""
                },
                {
                  model: "AP_SA_HC-1.0K_V**",
                  capacity: "1000",
                  interior: { width: "850", depth: "750", height: "1575" },
                  exterior: { width: "975", depth: "1480", height: "2230" },
                  trays: "4",
                  powerSupply: ""
                }
              ]
            },
            {
              name: "BOD Incubator",
              description: "BOD Incubator, which stands for Bio-Oxygen Demand Incubator, serves the critical function of maintaining precise temperature control for various applications.",
              image: "/images/products/bod-incubator.png",
              features: [
                "Biological oxygen demand testing",
                "Temperature stability",
                "Compact design",
                "Energy efficient"
              ],
              specifications: {
                "Temperature Range": "10°C to 60°C",
                "Accuracy": "± 0.2°C",
                "Uniformity": "± 1.0°C"
              },
              models: [
                {
                  model: "AP_SA_BO/BI-1.25_V**",
                  capacity: "125",
                  interior: { width: "600", depth: "350", height: "600" },
                  exterior: { width: "725", depth: "865", height: "1260" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_BO/BI-2.0_V**",
                  capacity: "200",
                  interior: { width: "660", depth: "450", height: "700" },
                  exterior: { width: "785", depth: "965", height: "1360" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_BO/BI-4.0_V**",
                  capacity: "400",
                  interior: { width: "700", depth: "650", height: "900" },
                  exterior: { width: "825", depth: "1165", height: "1560" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_BO/BI-6.0_V**",
                  capacity: "600",
                  interior: { width: "750", depth: "750", height: "1075" },
                  exterior: { width: "875", depth: "1275", height: "1735" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_BO/BI-8.0_V**",
                  capacity: "800",
                  interior: { width: "750", depth: "750", height: "1425" },
                  exterior: { width: "875", depth: "1275", height: "2085" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_BO/BI-1.0K_V**",
                  capacity: "1000",
                  interior: { width: "850", depth: "750", height: "1525" },
                  exterior: { width: "975", depth: "1275", height: "2230" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },

            {
              name: "Cold Chamber",
              description: "Refrigerated chambers for low-temperature storage and testing applications.",
              image: "/images/products/cold-chamber.png",
              features: [
                "Low temperature operation",
                "Energy efficient cooling",
                "Temperature monitoring",
                "Alarm systems"
              ],
              specifications: {
                "Temperature Range": "2°C to 8°C",
                "Accuracy": "± 1°C",
                "Uniformity": "± 2°C"
              },
              models: [
                {
                  model: "AP_SA_CC-1.25_V**",
                  capacity: "125",
                  interior: { width: "600", depth: "350", height: "600" },
                  exterior: { width: "725", depth: "865", height: "1260" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_CC-2.0_V**",
                  capacity: "200",
                  interior: { width: "660", depth: "450", height: "700" },
                  exterior: { width: "785", depth: "965", height: "1360" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_CC-4.0_V**",
                  capacity: "400",
                  interior: { width: "700", depth: "650", height: "900" },
                  exterior: { width: "825", depth: "1165", height: "1560" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_CC-6.0_V**",
                  capacity: "600",
                  interior: { width: "750", depth: "750", height: "1075" },
                  exterior: { width: "875", depth: "1275", height: "1735" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_CC-8.0_V**",
                  capacity: "800",
                  interior: { width: "750", depth: "750", height: "1425" },
                  exterior: { width: "875", depth: "1275", height: "2085" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_CC-1.0K_V**",
                  capacity: "1000",
                  interior: { width: "850", depth: "750", height: "1525" },
                  exterior: { width: "975", depth: "1275", height: "2230" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },
            {
              name: "Deep Freezer (upto -20°C / upto -40°C)",
              description: "Ultra-low temperature freezers for long-term storage of sensitive materials.",
              image: "/images/products/deep-freezer.png",
              features: [
                "Ultra-low temperature operation",
                "Heavy duty refrigeration",
                "Temperature monitoring",
                "Alarm systems"
              ],
              specifications: {
                "Temperature Range": "-5°C to -20°C / -25°C to -40°C",
                "Accuracy": "± 3°C",
                "Uniformity": "± 5°C"
              },
              models: [
                {
                  model: "AP_SA_DF-1.25_V**",
                  capacity: "125",
                  interior: { width: "625", depth: "400", height: "500" },
                  exterior: { width: "810", depth: "725", height: "1260" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-2.0_V**",
                  capacity: "200",
                  interior: { width: "650", depth: "500", height: "625" },
                  exterior: { width: "835", depth: "825", height: "1385" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-4.0_V**",
                  capacity: "400",
                  interior: { width: "700", depth: "650", height: "900" },
                  exterior: { width: "885", depth: "975", height: "1660" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-6.0_V**",
                  capacity: "600",
                  interior: { width: "750", depth: "800", height: "1000" },
                  exterior: { width: "935", depth: "1125", height: "1760" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-8.0_V**",
                  capacity: "800",
                  interior: { width: "750", depth: "800", height: "1350" },
                  exterior: { width: "935", depth: "1125", height: "2110" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-1.0K_V**",
                  capacity: "1000",
                  interior: { width: "825", depth: "825", height: "1500" },
                  exterior: { width: "1010", depth: "1150", height: "2260" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },
            {
              name: "Ultra Low Deep Freezer (-80°C)",
              description: "Specialized freezers for ultra-low temperature storage of biological samples and critical materials.",
              image: "/images/products/ultra-low-deep-freezer.png",
              features: [
                "Ultra-low temperature operation",
                "Heavy duty refrigeration system",
                "Master & stand by sensor",
                "SS Door with gasket",
                "Quick release filter",
                "One-hand operation handle",
                "Vacuum release port for quick re-access to samples",
                "Lock the cold air inner door closing pressure can be adjusted by the handle"
              ],
              specifications: {
                "Temperature Range": "-40°C to -86°C",
                "Accuracy": "± 5°C",
                "Uniformity": "± 5°C"
              },
              models: [
                {
                  model: "AP_SA_DF-3.4_V**",
                  capacity: "340",
                  interior: { width: "488", depth: "607", height: "1140" },
                  exterior: { width: "854", depth: "1006", height: "1907" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-4.08_V**",
                  capacity: "408",
                  interior: { width: "606", depth: "575", height: "1180" },
                  exterior: { width: "872", depth: "1028", height: "1945" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-5.88_V**",
                  capacity: "588",
                  interior: { width: "606", depth: "738", height: "1310" },
                  exterior: { width: "872", depth: "1192", height: "1994" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-7.28_V**",
                  capacity: "728",
                  interior: { width: "963", depth: "571", height: "1350" },
                  exterior: { width: "1229", depth: "1012", height: "1994" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_DF-8.38_V**",
                  capacity: "838",
                  interior: { width: "894", depth: "718", height: "1310" },
                  exterior: { width: "1160", depth: "1172", height: "1994" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },
            {
              name: "Photostability Chamber",
              description: "Specialized chambers for photostability testing according to ICH Q1B guidelines, supporting simultaneous Near UV & visible light testing.",
              image: "/images/products/photostability-chamber.png",
              features: [
                "ICH Q1B compliant",
                "Simultaneous Near UV & visible light testing",
                "Uniform light distribution",
                "Automatic light control",
                "Master & stand by sensor",
                "Two Door system with full view inner glass door & outer SS door",
                "Leakage proof silicon rubber gasket"
              ],
              specifications: {
                "Temperature Range": "20°C to 50°C",
                "Accuracy": "± 0.2°C",
                "Uniformity": "± 1°C"
              },
              models: [
                {
                  model: "AP_SA_PH-2.0_V**",
                  capacity: "200",
                  interior: { width: "800", depth: "500", height: "600" },
                  exterior: { width: "960", depth: "960", height: "1320" },
                  trays: "1",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_PH-4.0_V**",
                  capacity: "400",
                  interior: { width: "800", depth: "700", height: "700" },
                  exterior: { width: "760", depth: "1160", height: "1420" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },
            {
              name: "Pharma Refrigerator / Dual Zone Chamber",
              description: "Precision-engineered dual-zone chambers providing accurate and consistent temperature and humidity conditions for pharmaceutical products, with separate deep freezer and cold chamber zones.",
              image: "/images/products/pharma-refrigerator-dual-zone-chamber.png",
              features: [
                "Master & stand by sensor",
                "SS Door with gasket",
                "Heavy Duty refrigeration system",
                "Inner outer door with proof silicon"
              ],
              specifications: {
                "Upper Zone (Deep Freezer) Temperature Range": "-5°C to -20°C",
                "Upper Zone (Deep Freezer) Accuracy": "3°C",
                "Upper Zone (Deep Freezer) Uniformity": "5°C",
                "Lower Zone (Cold Chamber) Temperature Range": "2°C to 8°C",
                "Lower Zone (Cold Chamber) Accuracy": "1°C",
                "Lower Zone (Cold Chamber) Uniformity": "2°C"
              },
              models: [
                {
                  model: "AP_DC_DF-1.0_CC-1.0_V**",
                  exterior: { width: "825", depth: "850", height: "2055" },
                  powerSupply: "Single Phase 230 V",
                  zones: [
                    { name: "Upper Zone", capacity: "100", interior: { width: "640", depth: "350", height: "500" }, trays: "1" },
                    { name: "Lower Zone", capacity: "100", interior: { width: "640", depth: "350", height: "600" }, trays: "1" }
                  ]
                },
                {
                  model: "AP_DC_DF-2.0_CC-2.0_V**",
                  exterior: { width: "885", depth: "975", height: "2055" },
                  powerSupply: "Single Phase 230 V",
                  zones: [
                    { name: "Upper Zone", capacity: "200", interior: { width: "700", depth: "575", height: "500" }, trays: "2" },
                    { name: "Lower Zone", capacity: "200", interior: { width: "700", depth: "475", height: "600" }, trays: "2" }
                  ]
                },
                {
                  model: "AP_DC_DF-1.0_CC-2.0_V**",
                  exterior: { width: "885", depth: "975", height: "2010" },
                  powerSupply: "Single Phase 230 V",
                  zones: [
                    { name: "Upper Zone", capacity: "100", interior: { width: "700", depth: "350", height: "450" }, trays: "1" },
                    { name: "Lower Zone", capacity: "200", interior: { width: "700", depth: "475", height: "600" }, trays: "2" }
                  ]
                },
                {
                  model: "AP_DC_DF-2.0_CC-4.0_V**",
                  exterior: { width: "985", depth: "1100", height: "2300" },
                  powerSupply: "Single Phase 230 V",
                  zones: [
                    { name: "Upper Zone", capacity: "200", interior: { width: "800", depth: "500", height: "500" }, trays: "2" },
                    { name: "Lower Zone", capacity: "400", interior: { width: "800", depth: "600", height: "850" }, trays: "3" }
                  ]
                }
              ]
            },
            {
              name: "Hot Air Oven",
              description: "Aureole Pharma Tech hot air oven offers a controlled heating environment that is ideal for processes such as curing, drying, and conducting high-temperature tests.",
              image: "/images/products/hot-air-oven.png",
              features: [
                "High temperature capability",
                "Uniform heat distribution",
                "Digital control system",
                "Safety features"
              ],
              specifications: {
                "Temperature Range": "10°C above ambient to 250°C",
                "Accuracy": "± 1°C",
                "Uniformity": "± 5°C"
              },
              models: [
                {
                  model: "AP_SA_HO2-1.0_V**",
                  capacity: "100",
                  interior: { width: "450", depth: "450", height: "500" },
                  exterior: { width: "575", depth: "865", height: "1260" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_HO2-1.5_V**",
                  capacity: "150",
                  interior: { width: "500", depth: "500", height: "600" },
                  exterior: { width: "625", depth: "965", height: "1360" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_HO2-2.0_V**",
                  capacity: "200",
                  interior: { width: "600", depth: "500", height: "675" },
                  exterior: { width: "725", depth: "965", height: "1435" },
                  trays: "2",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_HO2-2.5_V**",
                  capacity: "250",
                  interior: { width: "600", depth: "600", height: "700" },
                  exterior: { width: "725", depth: "1065", height: "1460" },
                  trays: "3",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "APSA_HO2-3.0_V**",
                  capacity: "300",
                  interior: { width: "600", depth: "600", height: "850" },
                  exterior: { width: "725", depth: "1065", height: "1610" },
                  trays: "4",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },
            {
              name: "Vacuum Oven",
              description: "Precision vacuum ovens designed for applications requiring controlled atmosphere and uniform heating, ideal for drying, curing, and degassing.",
              image: "/images/products/vacuum-oven.png",
              features: [
                "High vacuum capability",
                "Precise temperature control",
                "Uniform heating",
                "Safety interlocks",
                "Digital display for temperature and vacuum",
                "Toughened glass window for sample viewing"
              ],
              specifications: {
                "Temperature Range": "60°C to 200°C",
                "Accuracy": "± 1°C",
                "Uniformity": "± 5°C",
                "Vacuum": "760 mm of mercury (-30)"
              },
              models: [
                {
                  model: "AP_SA_VO-0.15_V**",
                  capacity: "15",
                  interior: { width: "22.5 Dia.", depth: "30 Depth", height: "22.5 Dia." },
                  exterior: { width: "28.5", depth: "36", height: "28.5" },
                  trays: "Not specified",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_VO-0.21_V**",
                  capacity: "21",
                  interior: { width: "30 Dia.", depth: "30 Depth", height: "30 Dia." },
                  exterior: { width: "36", depth: "36", height: "36" },
                  trays: "Not specified",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_VO-0.27_V**",
                  capacity: "27",
                  interior: { width: "30 Dia.", depth: "38 Depth", height: "30 Dia." },
                  exterior: { width: "36", depth: "44", height: "36" },
                  trays: "Not specified",
                  powerSupply: "Single Phase 230 V"
                }
              ]
            },
            {
              name: "Muffle Furnace",
              description: "High-temperature furnaces for heat treatment and material processing applications, designed for precise temperature control and uniform heating.",
              image: "/images/products/muffle-furnace.png",
              features: [
                "High temperature operation",
                "Precise temperature control",
                "Uniform heating",
                "Safety features",
                "Digital control system",
                "Thermal insulation"
              ],
              specifications: {
                "Temperature Range": "1150°C",
                "Accuracy": "± 5°C"
              },
              models: [
                {
                  model: "AP_SA_MF-0.6_V**",
                  capacity: "6",
                  interior: { width: "150", depth: "300", height: "150" },
                  exterior: { width: "225", depth: "375", height: "225" },
                  trays: "Not specified",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_SA_MF-0.12_V**",
                  capacity: "12",
                  interior: { width: "200", depth: "300", height: "200" },
                  exterior: { width: "275", depth: "375", height: "275" },
                  trays: "Not specified",
                  powerSupply: "230 V"
                }
              ]
            }
          ]
        },
        {
          name: "Walk In Chambers",
          description: "Large-scale walk-in chambers for bulk testing and industrial applications.",
          subtypes: [
            {
              name: "Walk In Humidity Chamber",
              description: "Aureole Pharma Tech's walk-in humidity chambers are meticulously crafted with the purpose of creating controlled environments for studying and assessing the impacts of different environmental factors such as humidity and temperature. These test chambers find applications in a wide range of fields, including microbiology, plant studies, tissue research, electronic component testing, and various customized industrial and research endeavors. Our humidity test chambers are utilized in R&D laboratories, research projects, and product testing facilities. They serve a multitude of purposes, including tissue culture, enzyme reaction studies, growth observation, fermentation analysis, and other specialized applications in laboratories. We specialize in manufacturing both standard and customized humidity test cabinets, tailored to meet the unique and demanding requirements of individual scientists and specialized research projects.",
              image: "/images/products/walk-in-humidity-chamber.png",
              features: [
                "Full Door is of toughened glass",
                "Racks with trays",
                "Person trap alarm",
                "Door Access System (Numeric)",
                "Low water indication",
                "Master & stand by refrigeration/humidity system",
                "Split type refrigeration system",
                "Scanner: 8 pt. temperature & humidity sensor",
                "7\" Touch Screen HMI"
              ],
              specifications: {
                "Temperature Range": "20°C to 60°C",
                "Humidity Range": "40% RH to 95% RH",
                "Temperature Accuracy": "± 0.2°C",
                "Humidity Accuracy": "± 2.0% RH",
                "Temperature Uniformity": "± 1.0°C",
                "Humidity Uniformity": "± 3.0% RH",
                "Test Suitable for": "25°C & 60% RH, 30°C & 65% RH, 40°C & 75% RH, 30°C & 75% RH",
                "Also available with low conditions": "25°C & 40% RH, 40°C & 25% RH, 30°C & 35% RH"
              },
              models: [
                {
                  model: "AP_WC_HC-2.0K_V**",
                  capacity: "2000",
                  interior: { width: "1700", depth: "800", height: "1900" },
                  exterior: { width: "1860", depth: "960", height: "2060" },
                  trays: "12",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_HC-3.0K_V**",
                  capacity: "3000",
                  interior: { width: "1800", depth: "1000", height: "1900" },
                  exterior: { width: "1960", depth: "1160", height: "2060" },
                  trays: "12",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_HC-6.0K_V**",
                  capacity: "6000",
                  interior: { width: "2000", depth: "1500", height: "2000" },
                  exterior: { width: "2160", depth: "1660", height: "2160" },
                  trays: "24",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_HC-8.0K_V**",
                  capacity: "8000",
                  interior: { width: "2000", depth: "2000", height: "2000" },
                  exterior: { width: "2160", depth: "2160", height: "2160" },
                  trays: "24",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_HC-10.0K_V**",
                  capacity: "10000",
                  interior: { width: "2000", depth: "2500", height: "2000" },
                  exterior: { width: "2160", depth: "2660", height: "2160" },
                  trays: "36",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_HC-20.0K_V**",
                  capacity: "20000",
                  interior: { width: "2000", depth: "4000", height: "2500" },
                  exterior: { width: "2160", depth: "4160", height: "2660" },
                  trays: "56",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_HC-30.0K_V**",
                  capacity: "30000",
                  interior: { width: "2500", depth: "4800", height: "2500" },
                  exterior: { width: "2660", depth: "4960", height: "2660" },
                  trays: "98",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_HC-40.0K_V**",
                  capacity: "40000",
                  interior: { width: "4000", depth: "4000", height: "2500" },
                  exterior: { width: "4160", depth: "4160", height: "2600" },
                  trays: "98",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_HC-50.0K_V**",
                  capacity: "50000",
                  interior: { width: "4000", depth: "5000", height: "2500" },
                  exterior: { width: "4160", depth: "5160", height: "2660" },
                  trays: "154",
                  powerSupply: "Three Phase 415 V"
                }
              ]
            },
            {
              name: "Walk In Cold Chamber",
              description: "Large-scale walk-in cold chambers designed for bulk storage and industrial applications requiring precise temperature control in the cold range.",
              image: "/images/products/walk-in-cold-chamber.png",
              features: [
                "Viewing window with toughened glass",
                "Scanner: 8 pt. temperature sensor",
                "Door Access System (Numeric)",
                "Master & stand by refrigeration system",
                "Split type refrigeration system",
                "Racks with trays",
                "Person trap alarm",
                "7\" Touch Screen HMI"
              ],
              specifications: {
                "Temperature Range": "2°C to 8°C",
                "Accuracy": "± 1°C",
                "Uniformity": "± 2°C"
              },
              models: [
                {
                  model: "AP_WC_CC-2.0K_V**",
                  capacity: "2000",
                  interior: { width: "1700", depth: "800", height: "1900" },
                  exterior: { width: "1860", depth: "960", height: "2060" },
                  trays: "12",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_CC-3.0K_V**",
                  capacity: "3000",
                  interior: { width: "1800", depth: "1000", height: "1900" },
                  exterior: { width: "1960", depth: "1160", height: "2060" },
                  trays: "12",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_CC-6.0K_V**",
                  capacity: "6000",
                  interior: { width: "2000", depth: "1500", height: "2000" },
                  exterior: { width: "2160", depth: "1660", height: "2160" },
                  trays: "24",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_CC-8.0K_V**",
                  capacity: "8000",
                  interior: { width: "2000", depth: "2000", height: "2000" },
                  exterior: { width: "2160", depth: "2160", height: "2160" },
                  trays: "24",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_CC-10.0K_V**",
                  capacity: "10000",
                  interior: { width: "2000", depth: "2500", height: "2000" },
                  exterior: { width: "2160", depth: "2660", height: "2160" },
                  trays: "36",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_CC-20.0K_V**",
                  capacity: "20000",
                  interior: { width: "2000", depth: "4000", height: "2500" },
                  exterior: { width: "2160", depth: "4160", height: "2660" },
                  trays: "56",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_CC-30.0K_V**",
                  capacity: "30000",
                  interior: { width: "2500", depth: "4800", height: "2500" },
                  exterior: { width: "2660", depth: "4960", height: "2660" },
                  trays: "98",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_CC-40.0K_V**",
                  capacity: "40000",
                  interior: { width: "4000", depth: "4000", height: "2500" },
                  exterior: { width: "4160", depth: "4160", height: "2660" },
                  trays: "98",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_CC-50.0K_V**",
                  capacity: "50000",
                  interior: { width: "4000", depth: "5000", height: "2500" },
                  exterior: { width: "4160", depth: "5160", height: "2660" },
                  trays: "154",
                  powerSupply: "Three Phase 415 V"
                }
              ]
            },
            {
              name: "Walk In BOD Incubator",
              description: "Aureole Pharma Tech's premium walk-in Incubators stand out as the preferred choice for maintaining precise and uniform temperature conditions within the chamber. These incubators are renowned for their exceptional accuracy, making them the top choice for applications that demand stringent temperature control. Our premium walk-in Incubators are engineered to meet the exacting requirements of laboratories and research facilities that rely on precise and uniform temperature control for their experiments and processes.",
              image: "/images/products/walk-in-bod-incubator.png",
              features: [
                "Precise and uniform temperature conditions",
                "Exceptional accuracy for stringent temperature control",
                "Engineered to meet exacting requirements of laboratories and research facilities",
                "Full door of toughened glass with polysulphides for viewing samples",
                "Trays and detachable racks with adjustable angles",
                "7'' Touch Screen HMI (Allen Bradly)",
                "Master & Stand By refrigeration System",
                "Split type refrigeration system",
                "Scanner: 8 pt. Temperature Sensor",
                "Person trap/indication switch inside chamber with audible alarm outside",
                "Door Access System (Numeric)"
              ],
              specifications: {
                "Temperature Range": "10°C to 60°C",
                "Accuracy": "± 0.2°C",
                "Uniformity": "± 1.0°C"
              },
              models: [
                {
                  model: "AP_WC_BO-2.0K_V**",
                  capacity: "2000",
                  interior: { width: "1700", depth: "800", height: "1900" },
                  exterior: { width: "1860", depth: "960", height: "2060" },
                  trays: "12",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_BO-3.0K_V**",
                  capacity: "3000",
                  interior: { width: "1800", depth: "1000", height: "1900" },
                  exterior: { width: "1960", depth: "1160", height: "2060" },
                  trays: "12",
                  powerSupply: "Single Phase 230 V"
                },
                {
                  model: "AP_WC_BO-6.0K_V**",
                  capacity: "6000",
                  interior: { width: "2000", depth: "1500", height: "2000" },
                  exterior: { width: "2160", depth: "1660", height: "2160" },
                  trays: "24",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_BO-8.0K_V**",
                  capacity: "8000",
                  interior: { width: "2000", depth: "2000", height: "2000" },
                  exterior: { width: "2160", depth: "2160", height: "2160" },
                  trays: "24",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_BO-10.0K_V**",
                  capacity: "10000",
                  interior: { width: "2000", depth: "2500", height: "2000" },
                  exterior: { width: "2160", depth: "2660", height: "2160" },
                  trays: "36",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_BO-20.0K_V**",
                  capacity: "20000",
                  interior: { width: "2000", depth: "4000", height: "2500" },
                  exterior: { width: "2160", depth: "4160", height: "2660" },
                  trays: "56",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_BO-30.0K_V**",
                  capacity: "30000",
                  interior: { width: "2500", depth: "4800", height: "2500" },
                  exterior: { width: "2660", depth: "4960", height: "2660" },
                  trays: "98",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_BO-40.0K_V**",
                  capacity: "40000",
                  interior: { width: "4000", depth: "4000", height: "2500" },
                  exterior: { width: "4160", depth: "4160", height: "2660" },
                  trays: "98",
                  powerSupply: "Three Phase 415 V"
                },
                {
                  model: "AP_WC_BO-50.0K_V**",
                  capacity: "50000",
                  interior: { width: "4000", depth: "5000", height: "2500" },
                  exterior: { width: "4160", depth: "5160", height: "2660" },
                  trays: "154",
                  powerSupply: "Three Phase 415 V"
                }
              ]
            },
            {
              name: "Walk In Deep Freezer",
              description: "Large-scale walk-in deep freezers designed for bulk storage and industrial applications requiring ultra-low temperature conditions.",
              image: "/images/products/walk-in-deep-freezer.png",
              features: [
                "Master & stand by sensor",
                "Heavy Duty refrigeration system",
                "Door Access System (Numeric)",
                "Master & stand by refrigeration system",
                "Split type refrigeration system",
                "Racks with trays",
                "Person trap alarm",
                "7\" Touch Screen HMI",
                "Double walled with 125 mm PUF insulated modular panels",
                "SS 304 Interior & Exterior either SS 304 or Pre Coated GI",
                "Stainless Steel Trays",
                "Observation window - 300 x 300 mm",
                "Forced air circulation for uniform temperature",
                "CFC free cooling system",
                "Mechanism for equalizing air-pressure for door opening from inside",
                "Audio/Visual alarms for deviations"
              ],
              specifications: {
                "Deep Freezer Temperature Range": "-5°C to -20°C / -25°C to -40°C",
                "Accuracy": "3°C",
                "Uniformity": "5°C"
              }
            }
          ]
        }
      ]
    },
    "Table Top Instruments": {
      products: [
        {
          name: "Ultrasonic Baths",
          description: "Advanced ultrasonic cleaning solutions for laboratory applications with various series to meet different requirements.",
          subtypes: [
            {
              name: "Eco Series",
              description: "An ultrasonic bath, also known as an ultrasonic cleaner, is a device that uses ultrasound and a cleaning solvent to clean items. These baths are commonly used in various industries including laboratories, electronics manufacturing, medical facilities, jewellery making, and automotive repair.",
              image: "/images/products/eco-series.png",
              features: [
                "Energy efficient design",
                "Digital frequency control",
                "Compact footprint",
                "Easy operation",
                "Degas mode",
                "Inbuilt temperature control"
              ],
              specifications: {
                "Tank": "SS 304",
                "Enclosure": "SS 304",
                "Power Input": "230 VAC",
                "Degas Mode": "On / Off",
                "Transducer": "Imported make PZT type bonded at the bottom of the tank with weld bond technique",
                "Ultrasonic Generator": "Advance latest MOSFET/IGBT based smps",
                "Accessories": "Lid, Basket, Drain Valve, Powercard, User friendly operation manual"
              },
              models: [
                {
                  model: "AP_TT_UB_ES_3",
                  capacity: "3 Liter",
                  interior: { width: "140", depth: "240", height: "100" },
                  exterior: { width: "162", depth: "265", height: "240" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  ultrasonicPower: "100 Watts",
                  heaterPower: "100 Watts",
                  frequency: "33±3 kHz",
                  timer: "0 to 15 min",
                  temperature: "45°C (Inbuilt)"
                },
                {
                  model: "AP_TT_UB_ES_5",
                  capacity: "5 Liter",
                  interior: { width: "235", depth: "235", height: "100" },
                  exterior: { width: "265", depth: "265", height: "250" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  ultrasonicPower: "100 Watts",
                  heaterPower: "200 Watts",
                  frequency: "40/33±3 kHz",
                  timer: "0 to 99 min",
                  temperature: "Amb. - 60°C"
                },
                {
                  model: "AP_TT_UB_ES_10",
                  capacity: "10 Liter",
                  interior: { width: "240", depth: "300", height: "150" },
                  exterior: { width: "276", depth: "325", height: "260" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  ultrasonicPower: "250 Watts",
                  heaterPower: "200 Watts",
                  frequency: "40/33±3 kHz",
                  timer: "0 to 99 min",
                  temperature: "Amb. - 60°C"
                },
                {
                  model: "AP_TT_UB_ES_22",
                  capacity: "22 Liter",
                  interior: { width: "300", depth: "500", height: "150" },
                  exterior: { width: "320", depth: "530", height: "400" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  ultrasonicPower: "400 Watts",
                  heaterPower: "500 Watts",
                  frequency: "40/33±3 kHz",
                  timer: "0 to 99 min",
                  temperature: "Amb. - 60°C"
                }
              ]
            },
                          {
                name: "Prime Series",
                description: "An ultrasonic bath, also known as an ultrasonic cleaner, is a device that uses ultrasound and a cleaning solvent to clean items. These baths are commonly used in various industries, including laboratories, electronics manufacturing, medical facilities, jewellery making, and automotive repair.",
                image: "/images/products/prime-series.png",
                features: [
                  "Advanced control system",
                  "Multiple frequency options",
                  "Heating capability",
                  "Digital display",
                  "PSP functionality",
                  "Degas mode"
                ],
                specifications: {
                  "Tank": "SS 304",
                  "Enclosure": "SS 304",
                  "Power Input": "230 VAC",
                  "Degas Mode": "On / Off",
                  "Transducer": "Imported make PZT type bonded at the bottom of the tank with weld bond technique",
                  "Ultrasonic Generator": "Advance latest MOSFET/IGBT based smps",
                  "Accessories": "Lid, Basket, Drain Valve, Powercard, User friendly operation manual"
                },
                models: [
                  {
                    model: "AP_TT_UB_PS_6.5",
                    capacity: "6.5 Liter",
                    interior: { width: "6", depth: "12", height: "6" },
                    exterior: { width: "9.8", depth: "15", height: "15.4" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "150 Watts",
                    heaterPower: "500 Watts",
                    frequency: "25/33/40±3",
                    timer: "0 to 99 min",
                    temperature: "Amb. - 60°C",
                    psp: "Yes"
                  },
                  {
                    model: "AP_TT_UB_PS_20",
                    capacity: "20 Liter",
                    interior: { width: "12", depth: "14", height: "8" },
                    exterior: { width: "16", depth: "17.4", height: "16.8" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "400 Watts",
                    heaterPower: "500 Watts",
                    frequency: "25/33/40±3",
                    timer: "0 to 99 min",
                    temperature: "Amb. - 60°C",
                    psp: "Yes"
                  },
                  {
                    model: "AP_TT_UB_PS_30",
                    capacity: "30 Liter",
                    interior: { width: "15", depth: "15", height: "8" },
                    exterior: { width: "19.8", depth: "19.2", height: "19" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "500 Watts",
                    heaterPower: "500 Watts",
                    frequency: "25/33/40±3",
                    timer: "0 to 99 min",
                    temperature: "Amb. - 60°C",
                    psp: "Yes"
                  }
                ]
              },
                          {
                name: "Prime Series with Chilling",
                description: "A chiller sonicator, also known as a refrigerated ultrasonic bath or a cryogenic ultrasonic bath, combines the features of an ultrasonic bath with refrigeration capabilities. This equipment is particularly useful in applications where maintaining a low temperature during ultrasonic cleaning is crucial.",
                image: "/images/products/prime-series-chilling.png",
                features: [
                  "Integrated chilling system",
                  "Temperature control",
                  "Advanced ultrasonic cleaning",
                  "Digital interface",
                  "PSP functionality",
                  "Degas mode",
                  "Refrigeration capabilities"
                ],
                specifications: {
                  "Tank": "SS304",
                  "Enclosure": "SS304",
                  "Power Input": "230 VAC",
                  "Degas Mode": "Yes",
                  "PSP": "Yes",
                  "Chiller": "Yes",
                  "Ultrasonic Generator": "Advance latest MOSFET/IGBT based SMPS",
                  "Accessories": "Lid, basket, drain valve, power cord, operation manual"
                },
                models: [
                  {
                    model: "AP_TT_UB_CS_TT/FM_10",
                    capacity: "10 Liter",
                    interior: { width: "10", depth: "12", height: "6" },
                    exterior: { width: "17.2", depth: "18.4", height: "22" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "250W",
                    heaterPower: "N/A",
                    frequency: "33±3 khz",
                    timer: "0-99 min",
                    temperature: "10 to 35°C",
                    psp: "Yes",
                    degas: "Yes",
                    chiller: "Yes"
                  },
                  {
                    model: "AP_TT_UB_CS_TT/FM_20",
                    capacity: "20 Liter",
                    interior: { width: "12", depth: "18", height: "6" },
                    exterior: { width: "20", depth: "24", height: "20" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "400W",
                    heaterPower: "N/A",
                    frequency: "33±3 khz",
                    timer: "0-99 min",
                    temperature: "10 to 35°C",
                    psp: "Yes",
                    degas: "Yes",
                    chiller: "Yes"
                  }
                ]
              },
                          {
                name: "Prime Series with Advance Controlling",
                description: "Prime Series ultrasonic bath with advanced controlling likely refers to a high-end model of an ultrasonic cleaner with enhanced features and advanced control capabilities. Characteristics and features you might find in such a system are Advanced Control Interface, Digital Display, Temperature Control, Ultrasonic Power Control, Multiple Operating Modes, Programmable Features. The Prime Series ultrasonic bath with advanced controlling capabilities is designed to offer precise, efficient, and user-friendly operation for a wide range of cleaning applications in various industries, including laboratories, medical facilities, manufacturing, and research settings.",
                image: "/images/products/prime-series-advance-controlling.png",
                features: [
                  "Advanced Control Interface",
                  "Digital Display",
                  "Temperature Control",
                  "Ultrasonic Power Control",
                  "Multiple Operating Modes",
                  "Programmable Features",
                  "Chiller",
                  "PSP functionality",
                  "Degas mode"
                ],
                specifications: {
                  "Tank": "SS304",
                  "Enclosure": "SS304",
                  "Power Input": "230 VAC",
                  "Degas Mode": "Yes",
                  "PSP": "Yes",
                  "Chiller": "Yes",
                  "Ultrasonic Generator": "Advance latest MOSFET/IGBT based SMPS",
                  "Accessories": "Lid, basket, drain valve, power cord, operation manual",
                  "Castor Wheel": "PU coated castor wheels"
                },
                models: [
                  {
                    model: "AP_TT_UB_PSAC_30",
                    capacity: "30 Liter",
                    interior: { width: "15", depth: "15", height: "8" },
                    exterior: { width: "23", depth: "23", height: "36" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "500W",
                    heaterPower: "N/A",
                    frequency: "33±3 khz",
                    timer: "0-99 min",
                    temperature: "10 to 35°C",
                    psp: "Yes",
                    degas: "Yes",
                    chiller: "Yes"
                  },
                  {
                    model: "AP_TT_UB_PSAC_50",
                    capacity: "50 Liter",
                    interior: { width: "18", depth: "18", height: "10" },
                    exterior: { width: "26", depth: "26", height: "36" },
                    trays: "1",
                    powerSupply: "230 VAC",
                    ultrasonicPower: "750W",
                    heaterPower: "N/A",
                    frequency: "33±3 khz",
                    timer: "0-99 min",
                    temperature: "10 to 35°C",
                    psp: "Yes",
                    degas: "Yes",
                    chiller: "Yes"
                  }
                ]
              },
                          {
                name: "Prime Series with Heating & Shaking",
                description: "The Prime Series ultrasonic bath with heating and shaking capabilities is a sophisticated laboratory instrument designed to meet the demanding requirements of modern research and industrial applications. Its combination of ultrasonic cleaning, precise temperature control, and mechanical agitation offers users a versatile and efficient solution for a wide range of sample treatment and processing tasks.",
                image: "/images/products/prime-series-heating-shaking.png",
                features: [
                  "Heating capabilities",
                  "Shaking capabilities",
                  "Sophisticated laboratory instrument",
                  "Meets demanding research and industrial applications",
                  "Ultrasonic cleaning",
                  "Precise temperature control",
                  "Mechanical agitation",
                  "Versatile and efficient solution",
                  "Wide range of sample treatment and processing tasks"
                ],
                specifications: {
                  "Working Temperature Range": "Ambient -60°C",
                  "Display Resolution": "1°C",
                  "Temperature Capacity": "±1°C",
                  "Ultrasonic Frequency": "33 kHz, ±3",
                  "Bath Capacity": "20 L",
                  "Adjustable Shaking Frequency": "20-45 RPM",
                  "Shaking Stroke": "50 mm",
                  "Mains Power Supply": "230 VAC, 10 A, 50 Hz"
                },
                models: [
                  {
                    model: "AP_TT_UB_PSHS_20",
                    capacity: "20 Liter",
                    interior: { width: "300", depth: "485", height: "150" },
                    exterior: { width: "380", depth: "655", height: "425" },
                    trays: "1",
                    powerSupply: "230 VAC, 10 A, 50 Hz",
                    ultrasonicPower: "N/A",
                    heaterPower: "N/A",
                    frequency: "33 kHz, ±3",
                    timer: "N/A",
                    temperature: "Ambient -60°C",
                    psp: "N/A",
                    degas: "N/A",
                    chiller: "N/A",
                    shakingFrequency: "20-45 RPM",
                    shakingStroke: "50 mm",
                    displayResolution: "1°C",
                    tempCapacity: "±1°C"
                  }
                ]
              },
            {
              name: "Industrial Series",
              description: "Heavy-duty ultrasonic cleaning systems designed for industrial and large-scale applications.",
              image: "/images/products/industrial-series.png",
              features: [
                "Industrial grade construction",
                "High power output",
                "Large capacity",
                "Robust design"
              ],
              specifications: {
                "Frequency": "20/40/80 kHz",
                "Power": "500W - 2000W",
                "Capacity": "10L - 100L",
                "Construction": "Industrial grade"
              }
            }
          ]
        },
        {
          name: "Water Baths",
          description: "Precise temperature control water baths for various laboratory applications and sample incubation.",
          subtypes: [
            {
              name: "Constant",
              description: "A water bath is a testing cabinet which used in many industries and laboratories. The container's main substance for testing the specimen is a heated water. The samples are kept inside them to test their behavior in rising temperature. This machine has very distinct applications. It is utilized in biological labs to incubate sensitive which are unable to be kept in direct dry heat. This water bath is successfully used in R&D laboratory, microbiology, quality control, blood bank, pathology, chemical, food processing industry area in Pharmaceutical, Healthcare, Institutions & Food Industry.",
              image: "/images/products/constant-water-bath.png",
          features: [
                "Constant temperature control",
                "Digital display",
                "Stainless steel construction",
                "Safety features",
                "Overshoot & Water Level Low Cut Off",
                "Stainless Steel Heater Cover Tray",
                "Stainless Steel Gabled Lid",
                "Concentric Ring Lid with multiple holes"
              ],
              specifications: {
                "Temperature Range": "Ambient + 5 to 99.9°C",
                "Resolution": "0.1°C",
                "Control Accuracy": "± 0.5°C",
                "Uniformity": "± 0.5°C",
                "Timer": "0 to 9999 Min",
                "Safety Feature": "Overshoot & Water Level Low Cut Off",
                "Heater Cover Tray": "Stainless Steel",
                "Gabled Lid": "Stainless Steel"
              },
              models: [
                {
                  model: "AP_TT_WB_6",
                  capacity: "6",
                  interior: { width: "300", depth: "150", height: "150" },
                  exterior: { width: "350", depth: "200", height: "200" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "0.5 kW",
                  concentricRingLid: "3 Holes"
                },
                {
                  model: "AP_TT_WB_14",
                  capacity: "14",
                  interior: { width: "320", depth: "300", height: "150" },
                  exterior: { width: "370", depth: "350", height: "200" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "1 kW",
                  concentricRingLid: "6 Holes"
                },
                {
                  model: "AP_TT_WB_20",
                  capacity: "20",
                  interior: { width: "500", depth: "300", height: "150" },
                  exterior: { width: "550", depth: "350", height: "200" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "2.25 kW",
                  concentricRingLid: "12 Holes"
                },
                {
                  model: "AP_TT_WB_28",
                  capacity: "28",
                  interior: { width: "500", depth: "300", height: "250" },
                  exterior: { width: "550", depth: "350", height: "300" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "2.25 kW",
                  concentricRingLid: "12 Holes"
                }
              ]
            },
            {
              name: "Circulating",
              description: "A water bath is a testing cabinet which used in many industries and laboratories. The container's main substance for testing the specimen is a heated water. The samples are kept inside them to test their behavior in rising temperature. This machine has very distinct applications. It is utilized in biological labs to incubate sensitive which are unable to be kept in direct dry heat. This water bath is successfully used in R&D laboratory, microbiology, quality control, blood bank, pathology, chemical, food processing industry area in Pharmaceutical, Healthcare, Institutions & Food Industry.",
              image: "/images/products/circulating-water-bath.png",
          features: [
                "Circulation system for uniform temperature",
                "Digital control with high accuracy",
                "Stainless steel construction",
                "Safety features",
                "Overshoot & Water Level Low Cut Off",
                "Stainless Steel Heater Cover Tray",
                "Stainless Steel Gabled Lid",
                "Concentric Ring Lid with multiple holes",
                "Built-in circulation pump"
              ],
              specifications: {
                "Temperature Range": "Ambient + 5 to 95°C",
                "Resolution": "0.1°C",
                "Control Accuracy": "± 0.3°C",
                "Uniformity": "± 0.3°C",
                "Timer": "0 to 9999 Min",
                "Safety Feature": "Overshoot & Water Level Low Cut Off",
                "Heater Cover Tray": "Stainless Steel",
                "Gabled Lid": "Stainless Steel",
                "Circulation": "Built-in pump"
              },
              models: [
                {
                  model: "AP_TT_WBC_05",
                  capacity: "5",
                  interior: { width: "300", depth: "150", height: "150" },
                  exterior: { width: "350", depth: "200", height: "200" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "0.5 kW",
                  concentricRingLid: "3 Holes"
                },
                {
                  model: "AP_TT_WBC_14",
                  capacity: "14",
                  interior: { width: "320", depth: "300", height: "150" },
                  exterior: { width: "370", depth: "350", height: "200" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "1.5 kW",
                  concentricRingLid: "6 Holes"
                },
                {
                  model: "AP_TT_WBC_28",
                  capacity: "28",
                  interior: { width: "500", depth: "300", height: "250" },
                  exterior: { width: "550", depth: "350", height: "300" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "2 kW",
                  concentricRingLid: "12 Holes"
                }
              ]
            },
            {
              name: "Steam Bath",
              description: "A Steam bath is a advance version in water bath. It is designed such a way to reach and maintain 100 degree temperature. Steam bath is useful in many industries and laboratories. This machine is essential in Microbiology & Production Departments for substance testing the specimen is a heated water. The samples are kept inside them to test their behavior in rising temperature. This Steam bath is successfully used in microbiology, quality control, production Dept. in Pharmaceutical, Healthcare, Institutions & Food Industry.",
              image: "/images/products/steam-bath.png",
              features: [
                "Steam heating system",
                "Can reach and maintain 100°C temperature",
                "Essential for Microbiology & Production Departments",
                "Safety features",
                "Overshoot & Water Level Low Cut Off",
                "Stainless Steel Validation Port",
                "Stainless Steel Stand and Trolley with Heavy Wheels",
                "Digital control system",
                "Timer functionality"
              ],
              specifications: {
                "Temperature Range": "Ambient + 5 to 100°C",
                "Resolution": "0.1°C",
                "Control Accuracy": "± 2°C",
                "Uniformity": "± 2°C",
                "Timer": "0 to 9999 Min",
                "Safety Feature": "Overshoot & Water Level Low Cut Off",
                "Validation Port": "Stainless Steel",
                "Stand and Trolley": "Stainless Steel with Heavy Wheels",
                "Heating Method": "Steam"
              },
              models: [
                {
                  model: "AP_TT_SB_45",
                  capacity: "45",
                  interior: { width: "500", depth: "300", height: "325" },
                  exterior: { width: "550", depth: "350", height: "375" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "1.5 kW",
                  suitableForBottles: "1 x 12 no's"
                },
                {
                  model: "AP_TT_SB_65",
                  capacity: "65",
                  interior: { width: "500", depth: "300", height: "425" },
                  exterior: { width: "550", depth: "350", height: "475" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "3 kW",
                  suitableForBottles: "5 x 2 no's"
                },
                {
                  model: "AP_TT_SB_85",
                  capacity: "85",
                  interior: { width: "500", depth: "400", height: "150" },
                  exterior: { width: "550", depth: "450", height: "200" },
                  trays: "1",
                  powerSupply: "230 VAC",
                  heaterPower: "5 kW",
                  suitableForBottles: "5 x 4 no's"
                }
              ]
            },
            {
              name: "Oil Bath",
              description: "An oil bath, commonly used in chemistry laboratories, involves immersing reaction vessels or samples in heated oil to maintain stable and controlled temperatures, crucial for sensitive experiments and reactions. Moreover it has unique design to achieve upto 250°C.",
              image: "/images/products/oil-bath.png",
              features: [
                "High temperature capability up to 250°C",
                "Oil-based heating for stable temperature control",
                "Precise control for sensitive experiments",
                "Safety features",
                "Over Temperature & Thermostatic safety",
                "Stainless Steel Stand with Heavy Wheels",
                "Digital control system",
                "Timer functionality",
                "Suitable for bottles and flasks"
              ],
              specifications: {
                "Temperature Range": "50 to 250°C",
                "Resolution": "1°C",
                "Control Accuracy": "± 2°C",
                "Uniformity": "± 3°C",
                "Timer": "0 to 9999 Min",
                "Safety Feature": "Over Temperature & Thermostatic",
                "Stand": "Stainless Steel with Heavy Wheels",
                "Heating Medium": "Oil"
              },
              models: [
                {
                  model: "AP_TT_OB_45",
                  capacity: "01",
                  vesselDimensions: "150",
                  heaterPower: "0.4 kW",
                  suitableForBottles: "01",
                  powerSupply: "230 VAC"
                },
                {
                  model: "AP_TT_SB_65",
                  capacity: "03",
                  vesselDimensions: "200",
                  heaterPower: "1.0 kW",
                  suitableForBottles: "03",
                  powerSupply: "230 VAC"
                },
                {
                  model: "AP_TT_SB_85",
                  capacity: "20",
                  vesselDimensions: "400",
                  heaterPower: "2.5 kW",
                  suitableForBottles: "20",
                  powerSupply: "230 VAC"
                }
              ]
            },
            {
              name: "Dry Bath",
              description: "Digital Dry Bath Incubator is designed for maintaining constant temperature of samples in test tubes inserted in the aluminum block sockets. It is widely used for pathology laboratory, IVF Center, Pharmaceutical laboratory, Food & Dairy industries, PCR - analysis extraction of DNA and RNA from cell cultures, etc.",
              image: "/images/products/dry-bath.png",
              features: [
                "Contamination-free heating using dry blocks",
                "Compact design for laboratory use",
                "Multiple block options for different tube sizes",
                "Digital control system",
                "Aluminum block sockets for test tubes",
                "Widely used in pathology, IVF, and pharmaceutical labs",
                "PCR analysis and DNA/RNA extraction",
                "Food & Dairy industries applications"
              ],
              specifications: {
                "Temperature Range": "+5° above ambient to 100°C",
                "Timer": "1 min to 99hrs 59min or non stop",
                "Number of holes": "24 holes or 48 holes",
                "Hole Size": "0.5, 1.5, 2.0, 5.0, 7.5, 10.0, 15.0 ml tube size",
                "Dimensions": "23L x 23W x 13H cm Approx",
                "Power": "AC 220 V 50/60 Hz",
                "Weight": "4 kg",
                "Outer Body": "Fully SS 304"
              },
              models: [
                {
                  model: "AP_TT_DB_400",
                  temperatureRange: "+5° above ambient to 100°",
                  timer: "1 min to 99hrs 59min or non stop",
                  numberOfHoles: "24 holes or 48 holes",
                  holeSize: "0.5, 1.5, 2.0, 5.0, 7.5, 10.0, 15.0 ml tube size",
                  dimensions: "23L x 23W x 13H cm Approx",
                  power: "AC 220 V 50/60 Hz",
                  weight: "4 kg",
                  outerBody: "Fully SS 304"
                }
              ]
            },
            {
              name: "Chilled Circulating Bath",
              description: "A chilled circulating bath is a specialized piece of equipment commonly used in laboratory settings to maintain low temperatures for various applications such as cooling samples, apparatus, or reactions. It works by circulating chilled fluid, typically water or a refrigerant, through a cooling coil or jacket surrounding the sample or vessel. This ensures uniform and precise cooling, allowing researchers to carry out experiments requiring controlled temperatures. Chilled circulating baths are essential tools in fields such as chemistry, biology, and materials science, where maintaining specific temperature conditions is crucial for accurate results and product integrity.",
              image: "/images/products/chilled-circulating-bath.png",
              features: [
                "Cooling capability for low temperature applications",
                "Circulation system for uniform cooling",
                "Temperature control with high accuracy",
                "Digital interface",
                "Specialized for laboratory settings",
                "Cooling samples, apparatus, or reactions",
                "Uniform and precise cooling",
                "Essential for chemistry, biology, and materials science",
                "Silicon circulating pipe with insulating cover",
                "Water Level Low Cut Off safety feature"
              ],
              specifications: {
                "Temperature Range": "-10 to Ambient (Optional)",
                "Resolution": "1°C",
                "Control Accuracy": "± 1°C",
                "Uniformity": "± 2°C",
                "Timer": "NA (Not Applicable)",
                "Safety Feature": "Water Level Low Cut Off",
                "Circulating Pipe": "Silicon with insulating cover",
                "Cooling Power": "750W - 2500W"
              },
              models: [
                {
                  model: "AP_TT_CCB_06",
                  capacity: "06",
                  coolingPower: "750",
                  circulationFlow: "9",
                  powerSupply: "230 VAC"
                },
                {
                  model: "AP_TT_CCB_10",
                  capacity: "10",
                  coolingPower: "1250",
                  circulationFlow: "15",
                  powerSupply: "230 VAC"
                },
                {
                  model: "AP_TT_CCB_20",
                  capacity: "20",
                  coolingPower: "2500",
                  circulationFlow: "20",
                  powerSupply: "230 VAC"
                }
              ]
            }
          ]
        },
        {
          name: "Refrigerated Circular Bath",
          description: "The refrigerated circulating bath allows researchers to achieve precise and consistent temperature control over a wide range, usually from below room temperature to sub-zero temperatures. This makes it suitable for various applications such as cooling reactions, maintaining samples at specific temperatures, or controlling the temperature of analytical instruments like spectrophotometers and chromatography systems.",
          image: "/images/products/refrigerated-circular-bath.png",
          features: [
            "Precise temperature control over wide range",
            "Sub-zero temperature capability",
            "Cooling reactions and maintaining samples",
            "Controlling temperature of analytical instruments",
            "Suitable for spectrophotometers and chromatography systems",
            "Advanced refrigeration system",
            "Circulation pump for uniform temperature distribution",
            "Digital control interface",
            "Over Temperature & Water Level Low Cut Off safety features",
            "Silicon circulating pipe with insulating cover"
          ],
          specifications: {
            "Temperature Range": "-20 to 150 (Optional)",
            "Resolution": "1°C",
            "Control Accuracy": "± 2°C",
            "Uniformity": "± 3°C",
            "Timer": "0 to 9999 Min",
            "Safety Feature": "Over Temperature & Water Level Low Cut Off",
            "Circulating Pipe": "Silicon with insulating cover",
            "Cooling Power": "1250W - 3500W"
          },
          models: [
            {
              model: "AP_TT_RCB_06",
              capacity: "06",
              coolingPower: "1250",
              circulationFlow: "9",
              powerSupply: "230 VAC"
            },
            {
              model: "AP_TT_RCB_10",
              capacity: "10",
              coolingPower: "2500",
              circulationFlow: "15",
              powerSupply: "230 VAC"
            },
            {
              model: "AP_TT_RCB_20",
              capacity: "20",
              coolingPower: "3500",
              circulationFlow: "",
              powerSupply: "230 VAC"
            }
          ]
        },
        {
          name: "Air Sampler",
          description: "Air sampling systems for environmental monitoring and quality control applications.",
          subtypes: [
            {
              name: "Basic Model",
              description: "Advanced air sampling system with comprehensive features for environmental monitoring and quality control applications.",
              image: "/images/products/air-sampler-basic-1.png",
              images: [
                "/images/products/air-sampler-basic-1.png",
                "/images/products/air-sampler-basic-2.png",
                "/images/products/air-sampler-basic-3.png"
              ],

              specifications: {
                "Sampling Flow Rate": "Available in 25, 50, 100, 200 litr/min",
                "Volume": "25 to 2000 L",
                "Location": "1000 locations",
                "Sample Recipes": "1000 recipes",
                "Sampling Delay": "0 to 300 seconds",
                "Delay Between Runs": "0 to 600 seconds",
                "Group Configurations": "100 groups",
                "Users Configurations": "1000 users",
                "Remarks Configurations": "1000 marks",
                "Sample Data Records": "100000 to 500000 records",
                "Audit Trail Records": "500000 to 1500000 records",
                "Sampling Head": "1.00 mm 219 holes, anodized aluminum",
                "Weight": "2.7 kg",
                "Calibration": "Annual Calibration is recommended",
                "Battery Lifep04": "10 hours sampling backup",
                "Battery Charger": "14 to 16 Vdc with 1.5a",
                "Communication": "Wi-fi",
                "Display": "4.3: Tft Lcd (272 X 480)",
                "Operating Environments": "Temperature: 5 - 30 c; Humidity: 10 - 80% Rh",
                "Storage Environments": "Temperature: 5 - 40 c; Humidity: 10 - 80% Rh",
                "Warranty": "1 year"
              }
            },
            {
              name: "21 CFR Model",
              description: "Compliant air sampling system meeting 21 CFR Part 11 requirements.",
              image: "/images/products/air-sampler-21cfr.png",
                             images: [
                 "/images/products/air-sampler-21cfr-1.png",
                 "/images/products/air-sampler-21cfr-2.png",
                 "/images/products/air-sampler-21cfr-3.png",
                 "/images/products/air-sampler-21cfr-4.png",
                 "/images/products/air-sampler-21cfr-5.png"
               ],
               imageDescriptions: [
                 "Login Screen - Aspirating head quick bayonet fixing system for easy manipulation, Touch screen Interface, 100 or 200 ltr / minute flow rate available, Continue use with customized volumes, Device and software, fully 21 CFR - part -11 - compliant",
                 "Home Screen (Data options) - Data download through Wi-Fi, Directional data transfer, Multiple Sampler can connect with web host, Single and multi run options",
                 "Sample Data Search - 1000 / 10000 / 100000 Sample Data Cycle storage option available (Optional), 10000 / 50000 / 150000 Audit Trail Events storage options available with more than 75 audit trails types, 10 Hours Battery Backup, Robust Sampler Design, Easy and Fast Charging",
                 "Sample Running / Completed / Summary - Group creation option depending on permissions",
                 "Audit Trail Search & Reports - Smart user management with multiple level, Password authentication, Cycle data and audit trail data templates, Design option"
               ],
              features: [
                "Web-based software for seamless data downloading",
                "Secure password mechanism for login, abort samples, calibration service, battery changing etc.",
                "Automatic synchronization data transfer of sample data",
                "Configurable features like add, edit, view, enable/disable, discards for different configuration like group, users, location, recipe, remarks, report formats",
                "Unique feature such as display sample data records and audit trail records with using the filters for getting specific records details on device directly"
              ],

            }
          ]
        },
        {
          name: "Stainless Steel Items & Accessories",
          description: "High-quality stainless steel accessories and components for laboratory equipment including test tube racks, weight rings, exposing stands, swab plates, and lids & stands.",
          image: "/images/products/stainless-steel-accessories.png",
          images: [
            "/images/products/test-tube-racks-sheet.png",
            "/images/products/test-tube-racks-wire-mesh.png",
            "/images/products/weight-rings.png",
            "/images/products/exposing-stands.png",
            "/images/products/swab-plates-box.png",
            "/images/products/swab-plates-plate.png",
            "/images/products/swab-plates-perforated.png",
            "/images/products/lid-stands-tray.png",
            "/images/products/lid-stands-blocks.png",
            "/images/products/lid-stands-mesh-rack.png"
          ],
          features: [
            "Stainless steel construction",
            "Corrosion resistant",
            "Various sizes and configurations",
            "Easy cleaning and maintenance",
            "Precision weight rings for calibration",
            "Adjustable height exposing stands",
            "Sterilizable swab plates",
            "Compatible lids and stands"
          ]
        }
      ]
    }
  }

  // ========================================
  // MAIN RENDER LOGIC - Decide which view to show
  // ========================================
  console.log('🎯 Render Debug:', { 
    selectedProduct, 
    selectedIndividualProduct: selectedIndividualProduct?.name,
    showingDetailView: !!selectedProduct 
  })
  
  // VIEW 1: PRODUCT DETAIL VIEW - When a product category is selected
  // Shows: Sidebar with product list + Main content area with product details
  if (selectedProduct) {
  return (
    <>
      
        <section className="min-h-screen bg-background-off" ref={detailViewRef}>
          <div className="flex h-screen">
            {/* Left Section - Product List */}
            <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-white/30 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200/50">
                <button 
                  onClick={handleBackToProducts}
                  className="flex items-center text-primary-500 hover:text-text-primary mb-4 text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Products
                </button>
                
                <h2 className="text-xl font-bold text-text-primary mb-1">{selectedProduct}</h2>
                <p className="text-text-secondary text-sm">
                  {productInfo[selectedProduct.toLowerCase().replace(/\s+/g, '') as keyof typeof productInfo]?.subtitle}
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-text-primary">Products</h3>
                <div className="space-y-4">
                  {productDetails[selectedProduct as keyof typeof productDetails]?.products?.map((product, index) => (
                    <div key={index} className="relative">
                      {/* Main Product Category */}
                      <div 
                        className="flex items-center justify-between cursor-pointer transition-colors duration-200"
                        onClick={() => {
                          if ((product as any).subtypes) {
                            toggleSubtype(product.name)
                          } else {
                            handleSelectIndividualProduct(product)
                          }
                        }}
                      >
                        <div className="flex items-center">
                          {/* Preloader Icon for Main Types */}
                          <div className={`w-4 h-4 mr-3 transition-all duration-300 ${
                            expandedSubtypes === product.name
                              ? 'animate-dropdown-active'
                              : selectedIndividualProduct?.name === product.name
                              ? 'bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400'
                              : 'text-text-secondary'
                          }`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                            </svg>
                          </div>
                          
                          {/* Product Name */}
                          <h4 className={`text-base transition-colors duration-200 ${
                            selectedIndividualProduct?.name === product.name 
                              ? 'font-semibold text-lg bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent' 
                              : 'text-text-primary hover:text-primary-600'
                          }`}>
                            {product.name}
                          </h4>
                        </div>
                        
                        {/* Dropdown Icon */}
                        {(product as any).subtypes && (
                          <div className="ml-2">
                            <svg 
                              className={`w-4 h-4 transition-transform duration-200 text-text-secondary ${
                                expandedSubtypes === product.name ? 'rotate-180' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Simple Connecting Line and Subtypes */}
                      {(product as any).subtypes && (
                        <div className={`relative overflow-hidden transition-all duration-300 ease-out ${
                          expandedSubtypes === product.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          {/* Vertical Line */}
                          <div className="absolute left-2 top-0 w-px h-full bg-gradient-to-b from-primary-300 to-transparent"></div>
                           
                          {/* Subtypes */}
                          <div className="ml-4 mt-3 space-y-3">
                            {(product as any).subtypes.map((subtype: any, subtypeIndex: number) => (
                              <div 
                                key={subtypeIndex}
                                onClick={() => handleSelectIndividualProduct(subtype)}
                                className="flex items-center cursor-pointer transition-colors duration-200"
                              >
                                {/* Subtype Indicator */}
                                <div className="flex items-center mr-2">
                                  <svg className={`w-4 h-4 transition-colors duration-200 ${
                                    selectedIndividualProduct?.name === subtype.name
                                      ? 'text-primary-500'
                                      : 'text-text-secondary'
                                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                                
                                {/* Subtype Name */}
                                <h5 className={`transition-all duration-300 ease-out ${
                                  selectedIndividualProduct?.name === subtype.name 
                                    ? 'font-semibold text-lg text-primary-500' 
                                    : 'text-text-secondary hover:text-primary-600 text-sm'
                                }`}>
                                  {subtype.name}
                                </h5>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {selectedIndividualProduct ? (
                <div className="w-full">
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center mr-6">
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                                              <div>
                          <h1 className="text-4xl font-bold text-text-primary mb-2">{selectedIndividualProduct.name}</h1>
                          <p className="text-text-secondary text-lg">{selectedIndividualProduct.description}</p>
                        </div>
                    </div>
                    
                                                                                                                                                                      {/* Product Images and Specifications in Separate Cards */}
                       {/* Product Images Card - Only for products with gallery images */}
                       {selectedIndividualProduct.images && selectedIndividualProduct.images.length > 0 && (
                         <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-white/30 mb-8">
                           <div className="max-w-7xl mx-auto">
                             {selectedIndividualProduct.name === "Stainless Steel Items & Accessories" ? (
                               // Special layout for Stainless Steel Items - 2 rows of 5 images each
                               <div className="space-y-8">
                                 {/* First Row: Images 0-4 */}
                                 <div className="flex gap-6">
                                   {selectedIndividualProduct.images.slice(0, 5).map((image: string, index: number) => (
                                     <div key={index} className="w-64">
                                       <img 
                                         src={image} 
                                         alt={`${selectedIndividualProduct.name} - Image ${index + 1}`}
                                         className="w-full h-48 object-contain rounded-lg"
                                       />
                                       <div className="mt-2 p-2 glass rounded-lg">
                                         <p className="text-sm font-medium text-center">
                                           {index === 0 && "Test Tube Racks - Sheet"}
                                           {index === 1 && "Test Tube Racks - Wire Mesh"}
                                           {index === 2 && "Weight Rings"}
                                           {index === 3 && "Exposing Stands"}
                                           {index === 4 && "Swab Plates - Box"}
                                         </p>
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                                 {/* Second Row: Images 5-9 */}
                                 <div className="flex gap-6">
                                   {selectedIndividualProduct.images.slice(5, 10).map((image: string, index: number) => (
                                     <div key={index + 5} className="w-64">
                                       <img 
                                         src={image} 
                                         alt={`${selectedIndividualProduct.name} - Image ${index + 6}`}
                                         className="w-full h-48 object-contain rounded-lg"
                                       />
                                       <div className="mt-2 p-2 glass rounded-lg">
                                         <p className="text-sm font-medium text-center">
                                           {index === 0 && "Swab Plates - Plate"}
                                           {index === 1 && "Swab Plates - Perforated"}
                                           {index === 2 && "Lid & Stands - Tray"}
                                           {index === 3 && "Lid & Stands - Blocks"}
                                           {index === 4 && "Lid & Stands - Mesh Rack"}
                                         </p>
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             ) : selectedIndividualProduct.name === "Basic Model" ? (
                               // Special layout for Basic Model - images on left, specifications on right
                               <div className="flex items-start gap-8">
                                 {/* Images on the left */}
                                 <div className="flex flex-col gap-4">
                                   {selectedIndividualProduct.images.map((image: string, index: number) => (
                                     <div key={index} className="w-64">
                                       <img 
                                         src={image} 
                                         alt={`${selectedIndividualProduct.name} - Image ${index + 1}`}
                                         className="w-full h-auto object-contain rounded-lg"
                                       />
                                     </div>
                                   ))}
                                 </div>
                                 
                                 {/* Specifications on the right */}
                                 <div className="flex-1">
                                   <h3 className="text-xl font-semibold mb-4 flex items-center">
                                     <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                       <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                       </svg>
                                     </div>
                                     Air Sampler - Salient Features
                                   </h3>
                                   <div className="space-y-3">
                                     {Object.entries(selectedIndividualProduct.specifications).map(([key, value], specIndex) => (
                                       <div key={specIndex} className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0">
                                         <span className="font-medium text-base">{key}</span>
                                         <span className="text-text-secondary text-base">{value as string}</span>
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               </div>
                             ) : (
                               // Original layout for other products (21 CFR Model)
                               <div className="flex gap-6">
                                 {selectedIndividualProduct.images.slice(0, 5).map((image: string, index: number) => (
                                   <div key={index} className="w-96">
                                     <img 
                                       src={image} 
                                       alt={`${selectedIndividualProduct.name} - Image ${index + 1}`}
                                       className="w-full h-auto rounded-lg"
                                     />
                                     {selectedIndividualProduct.imageDescriptions && selectedIndividualProduct.imageDescriptions[index] && (
                                       <div className="mt-2 p-3 glass rounded-lg">
                                         <p className="text-sm text-text-secondary leading-relaxed">
                                           {selectedIndividualProduct.imageDescriptions[index]}
                                         </p>
                                       </div>
                                     )}
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>
                         </div>
                       )}





                       {/* Main Product Card - Image, Features, and Specifications */}
                       {(!selectedIndividualProduct.images || selectedIndividualProduct.images.length === 0) && (
                         <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-white/30 mb-8">
                           <div className="flex items-start gap-8">
                             {/* Product Image */}
                             <div className="w-80 flex-shrink-0">
                               <img 
                                 src={selectedIndividualProduct.image} 
                                 alt={selectedIndividualProduct.name}
                                 className="w-full h-80 object-contain rounded-lg shadow-md bg-white/10 p-4"
                               />
                             </div>
                             
                             {/* Features and Specifications */}
                             <div className="flex-1 min-w-0 pl-4">
                               <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                 {/* Key Features */}
                                 {selectedIndividualProduct.features && selectedIndividualProduct.features.length > 0 && (
                                   <div>
                                     <h3 className="text-xl font-semibold mb-4 flex items-center">
                                       <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                         <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                         </svg>
                                       </div>
                                       Key Features
                                     </h3>
                                                                           <ul className="space-y-2">
                                        {selectedIndividualProduct.features.slice(0, showAllFeatures ? undefined : 6).map((feature: string, index: number) => (
                                          <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-text-secondary text-sm">{feature}</span>
                                          </li>
                                        ))}
                                      </ul>
                                      {selectedIndividualProduct.features.length > 6 && (
                                        <button 
                                          onClick={() => setShowAllFeatures(!showAllFeatures)}
                                          className="text-primary-500 text-sm hover:underline mt-2 flex items-center"
                                        >
                                          {showAllFeatures ? (
                                            <>
                                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                              </svg>
                                              Show Less
                                            </>
                                          ) : (
                                            <>
                                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                              </svg>
                                              Show {selectedIndividualProduct.features.length - 6} More
                                            </>
                                          )}
                                        </button>
                                      )}
                                   </div>
                                 )}

                                 {/* Specifications */}
                                 {selectedIndividualProduct.specifications && Object.keys(selectedIndividualProduct.specifications).length > 0 && (
                                   <div>
                                     <h3 className="text-xl font-semibold mb-4 flex items-center">
                                       <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                         <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                         </svg>
                                       </div>
                                       Specifications
                                     </h3>
                                                                        <div className="space-y-2">
                                     {Object.entries(selectedIndividualProduct.specifications).map(([key, value], specIndex) => (
                                       <div key={specIndex} className="flex justify-between items-start py-1 border-b border-white/20 last:border-b-0">
                                           <span className="font-medium text-sm flex-shrink-0 mr-6">{key}</span>
                                           <span className="text-text-secondary text-sm text-right leading-tight break-words">{value as string}</span>
                                         </div>
                                       ))}
                                     </div>
                                   </div>
                                 )}
                               </div>
                             </div>
                           </div>
                         </div>
                       )}

                        {/* Key Features Card */}
                        {selectedIndividualProduct.name === "21 CFR Model" && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-white/30 mb-8">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                              Innovative Key Features for 21 CFR Air Sampler
                      </h3>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-text-secondary text-base">Web-based software for seamless data downloading</span>
                          </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-text-secondary text-base">Secure password mechanism for login, abort samples, calibration service, battery charging etc.</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-text-secondary text-base">Automatic synchronization data transfer of sample data</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-text-secondary text-base">Configurable features like add, edit, view, enable/disable, discard for different configurations like group, users, location, recipe, remarks, report formats</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-text-secondary text-base">Unique feature such as display sample data records and audit trail records with filters for getting specific records details on device directly</span>
                              </li>
                    </ul>
                  </div>
                        )}

                        {/* Key Features Text Block */}
                        {selectedIndividualProduct.name === "21 CFR Model" && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-white/30 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Key Features (Text Block)</h3>
                            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
                              <p><strong>Innovative key features for 21 CFR Air Sampler</strong></p>
                              <p>Web-based software for seamless data downloading</p>
                              <p>Secure password mechanism for login, abort samples, calibration service, battery charging etc.</p>
                              <p>Automatic synchronization data transfer of sample data</p>
                              <p>Configurable features like add, edit, view, enable/disable, discard for different configurations like group, users, location, recipe, remarks, report formats</p>
                              <p>Unique feature such as display sample data records and audit trail records with filters for getting specific records details on device directly</p>
                            </div>
                          </div>
                        )}


                  </div>
 




                  {/* Models Table */}
                  {selectedIndividualProduct.models && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold mb-1 flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        Product Specifications
                      </h3>
                      
                      <div className="overflow-x-auto">
                        {selectedIndividualProduct.name === "Pharma Refrigerator / Dual Zone Chamber" ? (
                          // Dual Zone Chamber Models Table
                          <table className="w-full border-collapse border border-white/20 glass">
                            <thead>
                              <tr className="bg-white/10">
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold">Model</th>
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold">Zone</th>
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold">Capacity (L)</th>
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold" colSpan={3}>Interior Dimension in MM</th>
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold">No Of Trays</th>
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold" colSpan={3}>Exterior Dimension in MM</th>
                                <th className="border border-white/20 px-4 py-3 text-left font-semibold">Power Supply</th>
                              </tr>
                                                              <tr className="bg-white/5">
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Width</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Depth</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Height</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Width</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Depth</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Height</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                </tr>
                            </thead>
                            <tbody>
                              {selectedIndividualProduct.models.map((model: any, index: number) => (
                                model.zones ? (
                                  // Dual zone model - create rows for each zone
                                  model.zones.map((zone: any, zoneIndex: number) => (
                                    <tr key={`${index}-${zoneIndex}`} className={zoneIndex % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}>
                                      {zoneIndex === 0 ? (
                                        <td className="border border-white/20 px-4 py-3 text-sm font-medium" rowSpan={model.zones.length}>
                                          {model.model}
                                        </td>
                                      ) : null}
                                      <td className="border border-gray-200 px-4 py-3 text-sm text-text-secondary">{zone.name}</td>
                                      <td className="border border-gray-600/50 px-4 py-3 text-sm text-text-secondary">{zone.capacity}</td>
                                      <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{zone.interior.width}</td>
                                      <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{zone.interior.depth}</td>
                                      <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{zone.interior.height}</td>
                                      <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{zone.trays}</td>
                                      {zoneIndex === 0 ? (
                                        <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary" rowSpan={model.zones.length}>
                                          {model.exterior.width}
                                        </td>
                                      ) : null}
                                      {zoneIndex === 0 ? (
                                        <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary" rowSpan={model.zones.length}>
                                          {model.exterior.depth}
                                        </td>
                                      ) : null}
                                      {zoneIndex === 0 ? (
                                        <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary" rowSpan={model.zones.length}>
                                          {model.exterior.height}
                                        </td>
                                      ) : null}
                                      {zoneIndex === 0 ? (
                                        <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary" rowSpan={model.zones.length}>
                                          {model.powerSupply}
                                        </td>
                                      ) : null}
                                    </tr>
                                  ))
                                ) : (
                                  // Single zone model
                                  <tr key={index} className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}>
                                    <td className="border border-white/20 px-4 py-3 text-sm font-medium">{model.model}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">-</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.capacity}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.interior.width}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.interior.depth}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.interior.height}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.trays}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.exterior.width}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.exterior.depth}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.exterior.height}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.powerSupply}</td>
                                  </tr>
                                )
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          // Standard Models Table - Hide for Eco Series, Prime Series, Prime Series with Chilling, Prime Series with Advance Controlling, Prime Series with Heating & Shaking, Constant Water Bath, Circulating Water Bath, Steam Bath, Oil Bath, Dry Bath, Chilled Circulating Bath, Refrigerated Circular Bath, and Air Sampler Basic Model
                          selectedIndividualProduct.name !== "Eco Series" && selectedIndividualProduct.name !== "Prime Series" && selectedIndividualProduct.name !== "Prime Series with Chilling" && selectedIndividualProduct.name !== "Prime Series with Advance Controlling" && selectedIndividualProduct.name !== "Prime Series with Heating & Shaking" && selectedIndividualProduct.name !== "Constant" && selectedIndividualProduct.name !== "Circulating" && selectedIndividualProduct.name !== "Steam Bath" && selectedIndividualProduct.name !== "Oil Bath" && selectedIndividualProduct.name !== "Dry Bath" && selectedIndividualProduct.name !== "Chilled Circulating Bath" && selectedIndividualProduct.name !== "Refrigerated Circular Bath" && (
                            <table className="w-full border-collapse border border-white/20 glass">
                              <thead>
                                <tr className="bg-white/10">
                                  <th className="border border-white/20 px-4 py-3 text-left font-semibold">Model</th>
                                  <th className="border border-white/20 px-4 py-3 text-left font-semibold">Capacity (L)</th>
                                  <th className="border border-white/20 px-4 py-3 text-left font-semibold" colSpan={3}>Interior Dimension in MM</th>
                                  <th className="border border-white/20 px-4 py-3 text-left font-semibold" colSpan={3}>Exterior Dimension in MM</th>
                                  <th className="border border-white/20 px-4 py-3 text-left font-semibold">No Of Trays</th>
                                  <th className="border border-white/20 px-4 py-3 text-left font-semibold">Power Supply</th>
                                </tr>
                                <tr className="bg-white/5">
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Width</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Depth</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Height</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Width</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Depth</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold">Height</th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                  <th className="border border-white/20 px-4 py-2 text-left font-semibold"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedIndividualProduct.models.map((model: any, index: number) => (
                                  <tr key={index} className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}>
                                    <td className="border border-white/20 px-4 py-3 text-sm font-medium">{model.model}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.capacity}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.interior.width}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.interior.depth}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.interior.height}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.exterior.width}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.exterior.depth}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.exterior.height}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.trays}</td>
                                    <td className="border border-white/20 px-4 py-3 text-sm text-text-secondary">{model.powerSupply}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )
                        )}
                      </div>
                      
                      {selectedIndividualProduct.name !== "Eco Series" && selectedIndividualProduct.name !== "Prime Series" && selectedIndividualProduct.name !== "Prime Series with Chilling" && selectedIndividualProduct.name !== "Prime Series with Advance Controlling" && selectedIndividualProduct.name !== "Prime Series with Heating & Shaking" && selectedIndividualProduct.name !== "Constant" && selectedIndividualProduct.name !== "Circulating" && selectedIndividualProduct.name !== "Steam Bath" && selectedIndividualProduct.name !== "Oil Bath" && selectedIndividualProduct.name !== "Dry Bath" && selectedIndividualProduct.name !== "Chilled Circulating Bath" && selectedIndividualProduct.name !== "Refrigerated Circular Bath" && (
                        <p className="text-sm text-text-secondary mt-4 italic">
                          Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction & body
                        </p>
                      )}

                      {/* Ultrasonic Bath - Eco Series Detailed Table */}
                      {selectedIndividualProduct.name === "Eco Series" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-white/20 text-sm glass">
                              <thead>
                                <tr className="bg-white/10">
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">Specification</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_ES_3</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_ES_5</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_ES_10</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_ES_22</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Tank Size (L*W*H)</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">240*140*100</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">235*235*100</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">300*240*150</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">500*300*150</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Outer Size (L*W*H) (mm)</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">265*162*240</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">265*265*250</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">325*276*260</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">530*320*400</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Tank</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Enclosure</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Tank Capacity</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">3 Liter</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">5 Liter</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">10 Liter</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">22 Liter</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Ultrasonic Power</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">100 Watts</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">100 Watts</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">250 Watts</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">400 Watts</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Heater Power</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">100 Watts</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">200 Watts</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">200 Watts</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">500 Watts</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">PSP</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">NA</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">NA</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">NA</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">NA</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Ultrasonic Freq.</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">33±3</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">40/33±3</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">40/33±3</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">40/33±3</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Timer Digital</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">0 to 15 min</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">0 to 99 min</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">0 to 99 min</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">0 to 99 min</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Power Input</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">230 VAC</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Degas Mode</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">On / Off</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">On / Off</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">On / Off</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">On / Off</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Temperature</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">45°C (Inbuilt)</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">Amb. - 60°C</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">Amb. - 60°C</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">Amb. - 60°C</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Transducer</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary" colSpan={5}>Imported make PZT type bonded at the bottom of the tank with weld bond technique</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Ultrasonic Gen.</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary" colSpan={4}>Advance latest MOSFET/IGBT based smps</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Accessories</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary" colSpan={4}>Lid, Basket, Drain Valve, Powercard, User friendly operation manual</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <p className="text-sm text-text-secondary mt-4 italic">
                            Note*: Available in variable sizes (2 Ltr. to 22 Ltr.)
                          </p>
                        </div>
                      )}

                      {/* Ultrasonic Bath - Prime Series Detailed Table */}
                      {selectedIndividualProduct.name === "Prime Series" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-white/20 text-sm glass">
                              <thead>
                                <tr className="bg-white/10">
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">Specification</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_PS_6.5</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_PS_20</th>
                                  <th className="border border-white/20 px-3 py-2 text-left font-semibold">AP_TT_UB_PS_30</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Tank Size (L*W*H) (inches)</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">12*6*6</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">14*12*8</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">15*15*8</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Outer Size (L*W*H) (inches)</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">15*9.8*15.4</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">17.4*16*16.8</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">19.2*19.8*19</td>
                                </tr>
                                <tr className="bg-white/5">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Tank</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                </tr>
                                <tr className="bg-white/10">
                                  <td className="border border-white/20 px-3 py-2 font-medium">Enclosure</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                  <td className="border border-white/20 px-3 py-2 text-text-secondary">SS 304</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">6.5 Liter</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20 Liter</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">30 Liter</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">150 Watts</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">400 Watts</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 Watts</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 Watts</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 Watts</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 Watts</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">PSP</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Yes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Yes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Yes</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Freq.</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">25/33/40±3</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">25/33/40±3</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">25/33/40±3</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer Digital</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0 to 99 min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0 to 99 min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0 to 99 min</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Power Input</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Degas Mode</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">On / Off</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">On / Off</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">On / Off</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Amb. - 60°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Amb. - 60°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Amb. - 60°C</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Transducer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>Imported make PZT type bonded at the bottom of the tank with weld bond technique</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Gen.</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Advance latest MOSFET/IGBT based smps</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Accessories</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Lid, Basket, Drain Valve, Powercard, User friendly operation manual</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <p className="text-sm text-text-secondary mt-4 italic">
                            Note*: Available in variable sizes (6.5 Ltr. to 30 Ltr.)
                          </p>
                        </div>
                      )}

                      {/* Ultrasonic Bath - Prime Series with Chilling Detailed Table */}
                      {selectedIndividualProduct.name === "Prime Series with Chilling" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Model</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_UB_CS_TT/FM_10</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_UB_CS_TT/FM_20</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank Size (Inches)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">12*10*6</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">18*12*6</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Outer Size (Inches)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">18.4*17.2*22</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">24*20*20</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Enclouser</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10 Liter</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20 Liter</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Power (Watts)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">250W</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">400W</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Chiller</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">PSP</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Degas</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">U/S Frequency Khz</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">33±3 khz</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">33±3 khz</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer (Min)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0-99</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0-99</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temp (°C)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10 to 35°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10 to 35°C</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Power Input (VAC)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Gen</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={2}>Advance latest MOSFET/IGBT based SMPS</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Accessories</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={2}>Lid, basket, drain valve, power cord, operation manual</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Ultrasonic Bath - Prime Series with Advance Controlling Detailed Table */}
                      {selectedIndividualProduct.name === "Prime Series with Advance Controlling" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Specification</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_UB_PSAC_30</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_UB_PSAC_50</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank Size (Inches)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">15*15*8</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">18*18*10</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Outer Size (Inches)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">23*23*36</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">26*26*36</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Enclouser</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">SS304</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tank Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">30 Liter</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">50 Liter</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Power (Watts)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500W</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">750W</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Chiller</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">PSP</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Degas</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">✓</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">U/S Frequency (Khz)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">33±3 khz</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">33±3 khz</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer (Min)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0-99</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0-99</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temp (°C)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10 to 35°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10 to 35°C</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Power Input (VAC)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Gen</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={2}>Advance latest MOSFET/IGBT based SMPS</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Accessories</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={2}>Lid, basket, drain valve, power cord, opeartion manual</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Castor Wheel</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={2}>PU coated castor wheels</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <p className="text-sm text-text-secondary mt-4 italic">
                            Note*: Available in customised sizes (6.5 Ltr. to 30 Ltr.)
                          </p>
                        </div>
                      )}

                      {/* Ultrasonic Bath - Prime Series with Heating & Shaking Detailed Table */}
                      {selectedIndividualProduct.name === "Prime Series with Heating & Shaking" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Specification</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_UB_PSHS_20</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Working Temp Range (°C)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Ambient -60</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Display Resolution (°C)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temp Capacity (°C)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">±1</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Ultrasonic Freq (Khz)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">33 khz, ±3</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Bath Capacity (L)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Adjustable Shaking freq (RPM)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20-45</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Shaking Stroke (mm)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">50</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Internal Bath Dimensions (mm)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">485*300*150</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">External Bath Dimensions (mm)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">655*380*425</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Tray Size (mm)</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">385*260*65</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Mains Power Supply</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">230 VAC, 10 A, 50 Hz</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">R&D Institute</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Research Institute</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Microbiology</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Water Bath - Constant Detailed Table */}
                      {selectedIndividualProduct.name === "Constant" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Unit</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WB_6</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WB_14</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WB_20</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WB_28</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WB_6</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WB_14</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WB_20</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WB_28</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lit</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">6</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">14</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">28</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Inner Dimensions L x D x H</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Mm</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">300 x 150 x 150</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">320 x 300 x 150</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 x 300 x 150</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 x 300 x 250</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">kW</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0.5</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2.25</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2.25</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>Ambient + 5 to 99.9</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Resolution</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>0.1</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Control Accuracy</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>± 0.5</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Uniformity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>± 0.5</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>0 to 9999</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Safety feature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>Overshoot & Water Level Low Cut Off</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Cover Tray</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>Stainless Steel</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Gabled Lid</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={4}>Stainless Steel</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Concentric Ring Lid</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">3 Holes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">6 Holes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">12 Holes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">12 Holes</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Healthcare - Hospitals (OT, Micro, Pathology, Blood Bank Labs)</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals - Quality, R&D, Production</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Institutes - Research Labs</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Food Industries - QC, Testing Labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Water Bath - Circulating Detailed Table */}
                      {selectedIndividualProduct.name === "Circulating" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Unit</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WBC_05</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WBC_14</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_WBC_28</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WBC_05</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WBC_14</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_WBC_28</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lit</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">5</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">14</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">28</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Inner Dimensions L x D x H</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Mm</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">300 x 150 x 150</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">320 x 300 x 150</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 x 300 x 250</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">kW</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0.5</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1.5</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Ambient + 5 to 95</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Resolution</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>0.1</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Control Accuracy</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>± 0.3</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Uniformity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>± 0.3</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>0 to 9999</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Safety feature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Overshoot & Water Level Low Cut Off</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Cover Tray</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Stainless Steel</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Gabled Lid</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Stainless Steel</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Concentric Ring Lid</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">3 Holes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">6 Holes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">12 Holes</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Healthcare - Hospitals (OT, Micro, Pathology, Blood Bank Labs)</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals - Quality, R&D, Production</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Institutes - Research Labs</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Food Industries - QC, Testing Labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Water Bath - Steam Bath Detailed Table */}
                      {selectedIndividualProduct.name === "Steam Bath" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Unit</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_SB_45</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_SB_65</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_SB_85</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_SB_45</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_SB_65</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_SB_85</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lit</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">45</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">65</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">85</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Inner Dimensions L x D x H</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Mm</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 x 300 x 325</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 x 300 x 425</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500 x 400 x 150</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">kW</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1.5</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">3</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">5</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Suitable for Bottles/Flasks</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lits</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1 x 12 no's</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">5 x 2 no's</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">5 x 4 no's</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Ambient + 5 to 100</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Resolution</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>0.1</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Control Accuracy</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±2</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Uniformity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±2</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>0 to 9999</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Safety feature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Overshoot & Water Level Low Cut Off</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Validation Port</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Stainless Steel</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Stand and Trolley</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Stainless Steel with Heavy Wheels</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals - QC, Microbiology, Production Labs</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Institutes - Microbiology, Research Labs</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Food Industries - QC, Testing Labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Water Bath - Oil Bath Detailed Table */}
                      {selectedIndividualProduct.name === "Oil Bath" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Unit</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_OB_45</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_SB_65</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_SB_85</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_OB_45</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_SB_65</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_SB_85</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lit</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">01</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">03</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Vessel Dimensions OD</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Mm</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">150</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">200</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">400</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Heater Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">kW</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0.4</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1.0</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2.5</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Suitable for Bottles / Flasks</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lits</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">01</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">03</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>50 to 250</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Resolution</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>1</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Control Accuracy</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±2</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Uniformity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±3</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>0 to 9999</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Safety feature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Over Temperature & Thermostatic</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Stand Slask</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Stainless Steel with Heavy Wheels</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">R&D Institute</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Research Institute</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Microbiology</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-text-secondary mt-4 italic">
                            Note*: Available in variable sizes (1 Ltr. to 20 Ltr.)
                          </p>
                        </div>
                      )}

                      {/* Water Bath - Dry Bath Detailed Table */}
                      {selectedIndividualProduct.name === "Dry Bath" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_DB_400</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">+5° above ambient to 100°</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1 min to 99hrs 59min or non stop</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Number of holes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">24 holes or 48 holes</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Hole Size</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">holes can be designed for 0.5, 1.5, 2.0, 5.0, 7.5, 10.0, 15.0 ml tube size</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Dimensions</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">23L x 23W x 13H cm Approx</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AC 220 V 50/60 Hz</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Weight</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">4 kg</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Outer Body</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Fully SS 304</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">R&D Institute</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Research Institute</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Microbiology</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-text-secondary mt-4 italic">
                            Note*: Available in Customised Blocks
                          </p>
                        </div>
                      )}

                      {/* Water Bath - Chilled Circulating Bath Detailed Table */}
                      {selectedIndividualProduct.name === "Chilled Circulating Bath" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Unit</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_CCB_06</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_CCB_10</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_CCB_20</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_CCB_06</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_CCB_10</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_CCB_20</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lit</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">06</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Cooling Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">kW</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">750</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1250</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2500</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Circulation Flow</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">LMP</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">9</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">15</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>-10 to Ambient (Optional)</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Resolution</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>1</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Control Accuracy</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±1</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Uniformity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±2</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>NA (Not Applicable)</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Safety feature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Water Level Low Cut Off</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Circulating Pipe</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Silicon with insulating cover</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals - Quality, R&D, Production Labs</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Institutes - R&D Labs</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Food Industries - QC, Testing Labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Refrigerated Circular Bath Detailed Table */}
                      {selectedIndividualProduct.name === "Refrigerated Circular Bath" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Unit</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_RCB_06</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_RCB_10</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">AP_TT_RCB_20</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Model</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_RCB_06</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_RCB_10</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">AP_TT_RCB_20</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Capacity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Lit</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">06</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">20</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Cooling Power</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">kW</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1250</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2500</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">3500</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Circulation Flow</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">LMP</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">9</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">15</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Temperature Range</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>-20 to 150 (Optional)</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Resolution</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>1</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Control Accuracy</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±2</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Uniformity</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">°C</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>±3</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Timer</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Min</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>0 to 9999</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Safety feature</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Over Temperature & Water Level Low Cut Off</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Circulating Pipe</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary"></td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary" colSpan={3}>Silicon with insulating cover</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="text-lg font-semibold text-text-primary mb-3">Industries We Serve:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Pharmaceuticals - Quality, R&D, Production Labs</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Institutes - R&D Labs</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-text-secondary">Food Industries - QC, Testing Labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Air Sampler - Basic Model Detailed Table */}
                      {selectedIndividualProduct.name === "Basic Model" && (
                        <div className="mt-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Feature</th>
                                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-text-primary">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Sampling Flow Rate</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Available in 25, 50, 100, 200 litr/min</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Volume</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">25 to 2000 L</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Location</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1000 locations</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Sample Recipes</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1000 recipes</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Sampling Delay</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0 to 300 seconds</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Delay Between Runs</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">0 to 600 seconds</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Group Configurations</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">100 groups</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Users Configurations</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1000 users</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Remarks Configurations</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1000 marks</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Sample Data Records</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">100000 to 500000 records</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Audit Trail Records</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">500000 to 1500000 records</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Sampling Head</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1.00 mm 219 holes, anodized aluminum</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Weight</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">2.7 kg</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Calibration</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Annual Calibration is recommended</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Battery Lifep04</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">10 hours sampling backup</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Battery Charger</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">14 to 16 Vdc with 1.5a</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Communication</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Wi-fi</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Display</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">4.3: Tft Lcd (272 X 480)</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Operating Environments</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Temperature: 5 - 30 c; Humidity: 10 - 80% Rh</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Storage Environments</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">Temperature: 5 - 40 c; Humidity: 10 - 80% Rh</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-text-primary">Warranty</td>
                                  <td className="border border-gray-300 px-3 py-2 text-text-secondary">1 year</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Detailed Description */}
                  {selectedIndividualProduct.name === "Walk In Humidity Chamber" && (
                    <div className="mb-8">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-text-secondary leading-relaxed mb-6">
                          Aureole Pharma Tech's walk-in humidity chambers are meticulously crafted with the purpose of creating controlled environments for studying and assessing the impacts of different environmental factors such as humidity and temperature. These test chambers find applications in a wide range of fields, including microbiology, plant studies, tissue research, electronic component testing, and various customized industrial and research endeavors. Our humidity test chambers are utilized in R&D laboratories, research projects, and product testing facilities. They serve a multitude of purposes, including tissue culture, enzyme reaction studies, growth observation, fermentation analysis, and other specialized applications in laboratories. We specialize in manufacturing both standard and customized humidity test cabinets, tailored to meet the unique and demanding requirements of individual scientists and specialized research projects.
                        </p>
                        
                        <p className="text-text-secondary leading-relaxed mb-8">
                          We specialize in manufacturing both standard and customized humidity test cabinets, tailored to meet the unique and demanding requirements of individual scientists and specialized research projects.
                        </p>

                        <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                          <li>Full Door is of toughened glass</li>
                          <li>Racks with trays</li>
                          <li>Person trap alarm</li>
                          <li>Door Access System (Numeric)</li>
                          <li>Low water indication</li>
                          <li>Master & stand by refrigeration/humidity system</li>
                          <li>Split type refrigeration system</li>
                          <li>Scanner: 8 pt. temperature & humidity sensor</li>
                          <li>7" Touch Screen HMI</li>
                        </ul>

                        <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                          <li>21 CFR part 11 Compliance</li>
                          <li>Mobile Alert System</li>
                          <li>Hooter System</li>
                          <li>Door Access System (Biometric)</li>
                          <li>Extra Trays</li>
                        </ul>

                        <p className="text-sm text-text-secondary mt-4 italic">
                          Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                        </p>
                      </div>
                    </div>
                  )}

                                     {/* Detailed Description for Walk In BOD Incubator */}
                   {selectedIndividualProduct.name === "Walk In BOD Incubator" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Full door is of toughened glass with polysulphides to view the samples without disturbing the test conditions & human safety</li>
                           <li>Trays and detachable racks with adjustable angles</li>
                           <li>7'' Touch Screen HMI (Allen Bradly)</li>
                           <li>Master & Stand By refrigeration System</li>
                           <li>Split type refrigeration system</li>
                           <li>Scanner: 8 pt. Temperature Sensor</li>
                           <li>Person trap/indication switch inside chamber with audible alarm outside</li>
                           <li>Door Access System (Numeric)</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 compliance</li>
                           <li>GSM alert system</li>
                           <li>Hooter System</li>
                           <li>Door Access System (Biometric)</li>
                           <li>Extra Trays</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                         </p>
                       </div>
                     </div>
                   )}

                   {/* Detailed Description for Walk In Deep Freezer */}
                   {selectedIndividualProduct.name === "Walk In Deep Freezer" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Standard Equipment:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Double walled with 125 mm PUF insulated modular panels with easy on-site assembly</li>
                           <li>SS 304 Interior & Exterior either SS 304 or Pre Coated GI</li>
                           <li>Stainless Steel Trays</li>
                           <li>Observation window - 300 x 300 mm</li>
                           <li>Forced air circulation for uniform temperature</li>
                           <li>CFC free cooling system consisting of hermetically sealed compressor coupled with evaporation coil & condenser</li>
                           <li>Mechanism for equalizing air-pressure for door opening from inside</li>
                           <li>Audio/Visual alarms for deviations</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Master & stand by sensor</li>
                           <li>Heavy Duty refrigeration system</li>
                           <li>Door Access System (Numeric)</li>
                           <li>Master & stand by refrigeration system</li>
                           <li>Split type refrigeration system</li>
                           <li>Racks with trays</li>
                           <li>Person trap alarm</li>
                           <li>7" Touch Screen HMI</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Door Access System (Biometric)</li>
                           <li>Extra Trays</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           We can offer customised Equipment Capacity on client requirement
                         </p>
                       </div>
                     </div>
                   )}

                   {/* Detailed Description for Walk In Cold Chamber */}
                   {selectedIndividualProduct.name === "Walk In Cold Chamber" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Viewing window with toughened glass</li>
                           <li>Scanner: 8 pt. temperature sensor</li>
                           <li>Door Access System (Numeric)</li>
                           <li>Master & stand by refrigeration system</li>
                           <li>Split type refrigeration system</li>
                           <li>Racks with trays</li>
                           <li>Person trap alarm</li>
                           <li>7" Touch Screen HMI</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Door Access System (Biometric)</li>
                           <li>Extra Trays</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                         </p>
                       </div>
                     </div>
                   )}

                  {/* Detailed Description for Humidity Chamber / Stability Chamber */}
                  {selectedIndividualProduct.name === "Humidity Chamber / Stability Chamber" && (
                    <div className="mb-8">
                      <div className="prose prose-lg max-w-none">
                        <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                          <li>Inner outer door with proof silicon</li>
                          <li>Water & steam Tank</li>
                          <li>Low water indication</li>
                          <li>Master & stand by sensor</li>
                        </ul>

                        <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                          <li>21 CFR part 11 Compliance</li>
                          <li>Standby Refrigeration & Steam Generation System</li>
                          <li>Scanner: 4 pt. temperature & humidity sensor</li>
                          <li>Mobile Alert System</li>
                          <li>Hooter System</li>
                          <li>Door Access System (Numeric/Biometric)</li>
                          <li>Extra Trays</li>
                        </ul>

                        <p className="text-sm text-text-secondary mt-4 italic">
                          Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Detailed Description for BOD Incubator */}
                  {selectedIndividualProduct.name === "BOD Incubator" && (
                    <div className="mb-8">
                      <div className="prose prose-lg max-w-none">
                        <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                          <li>Inner outer door with proof silicon</li>
                          <li>Master & stand by sensor</li>
                        </ul>

                        <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                          <li>FDA 21 CFR part 11 Compliance</li>
                          <li>Standby Refrigeration System (for BOD Only)</li>
                          <li>Scanner: 4 pt. temperature sensor</li>
                          <li>Mobile Alert System</li>
                          <li>Hooter System</li>
                          <li>Door Access System (Numeric/Biometric)</li>
                          <li>Extra Trays</li>
                        </ul>

                        <p className="text-sm text-text-secondary mt-4 italic">
                          Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Detailed Description for Cold Chamber */}
                  {selectedIndividualProduct.name === "Cold Chamber" && (
                    <div className="mb-8">
                      <div className="prose prose-lg max-w-none">
                        <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                          <li>Inner outer door with proof silicon</li>
                          <li>Master & stand by sensor</li>
                        </ul>

                        <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                          <li>21 CFR part 11 Compliance</li>
                          <li>Standby Refrigeration System</li>
                          <li>Scanner: 4 pt. temperature sensor</li>
                          <li>Mobile Alert System</li>
                          <li>Hooter System</li>
                          <li>Door Access System (Numeric/Biometric)</li>
                          <li>Extra Trays</li>
                        </ul>

                        <p className="text-sm text-text-secondary mt-4 italic">
                          Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                        </p>
                      </div>
                    </div>
                  )}

                                     {/* Detailed Description for Deep Freezer (upto -20°C / upto -40°C) */}
                   {selectedIndividualProduct.name === "Deep Freezer (upto -20°C / upto -40°C)" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Master & stand by sensor</li>
                           <li>SS Door with gasket</li>
                           <li>Heavy Duty refrigeration system</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Extra Trays</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                         </p>
                       </div>
                     </div>
                   )}

                  {/* Detailed Description for Ultra Low Deep Freezer (-80°C) */}
                  {selectedIndividualProduct.name === "Ultra Low Deep Freezer (-80°C)" && (
                    <div className="mb-8">
                      <div className="prose prose-lg max-w-none">
                        <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                          <li>Master & stand by sensor</li>
                          <li>SS Door with gasket</li>
                          <li>Heavy duty refrigeration system</li>
                          <li>Quick release filter</li>
                          <li>One-hand operation handle</li>
                          <li>Vacuum release port for quick re-access to samples</li>
                          <li>Lock the cold air inner door closing pressure can be adjusted by the handle</li>
                        </ul>

                        <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                        <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                          <li>21 CFR part 11 Compliance</li>
                          <li>Mobile Alert System</li>
                          <li>Hooter System</li>
                          <li>Extra Trays</li>
                        </ul>

                        <p className="text-sm text-text-secondary mt-4 italic">
                          Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                        </p>
                      </div>
                    </div>
                  )}

                                     {/* Detailed Description for Photostability Chamber */}
                   {selectedIndividualProduct.name === "Photostability Chamber" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Inner Mirror finish & outer Matt finish</li>
                           <li>UV lights get switched off automatically once the door is opened</li>
                           <li>Tests the sample on Fluorescent light or U.V. lights</li>
                           <li>Uniform light distribution</li>
                           <li>Lights automatically shut off after specific exposure level</li>
                           <li>Master & stand by sensor</li>
                           <li>Two Door: Full view inner glass door & outer SS door & leakage proof silicon rubber gasket</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>UV Meter</li>
                           <li>LUX Meter</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Door Access System (Numeric/Biometric)</li>
                           <li>Extra Trays</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body. Photostability with Humidity is also available.
                         </p>
                       </div>
                     </div>
                   )}

                   {/* Detailed Description for Pharma Refrigerator / Dual Zone Chamber */}
                   {selectedIndividualProduct.name === "Pharma Refrigerator / Dual Zone Chamber" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>Master & stand by sensor</li>
                           <li>SS Door with gasket</li>
                           <li>Heavy Duty refrigeration system</li>
                           <li>Inner outer door with proof silicon</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Extra Trays</li>
                           <li>Scanner: 4 pt. temperature sensor</li>
                           <li>Door Access System (Numeric/Biometric)</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body. Different combination of Dual Zone Chambers also available.
                         </p>
                       </div>
                     </div>
                   )}

                   {/* Detailed Description for Hot Air Oven */}
                   {selectedIndividualProduct.name === "Hot Air Oven" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>High temperature capability</li>
                           <li>Uniform heat distribution</li>
                           <li>Digital control system</li>
                           <li>Safety features</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Extra Trays</li>
                           <li>Scanner: 4 pt. temperature sensor</li>
                           <li>Door Access System (Numeric/Biometric)</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                         </p>
                       </div>
                     </div>
                   )}

                   {/* Detailed Description for Vacuum Oven */}
                   {selectedIndividualProduct.name === "Vacuum Oven" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>High vacuum capability</li>
                           <li>Precise temperature control</li>
                           <li>Uniform heating</li>
                           <li>Safety interlocks</li>
                           <li>Digital display for temperature and vacuum</li>
                           <li>Toughened glass window for sample viewing</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Extra Trays</li>
                           <li>Scanner: 4 pt. temperature sensor</li>
                           <li>Door Access System (Numeric/Biometric)</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                         </p>
                       </div>
                     </div>
                   )}

                   {/* Detailed Description for Muffle Furnace */}
                   {selectedIndividualProduct.name === "Muffle Furnace" && (
                     <div className="mb-8">
                       <div className="prose prose-lg max-w-none">
                         <h4 className="text-xl font-semibold text-text-primary mb-4">Regular Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-8">
                           <li>High temperature operation</li>
                           <li>Precise temperature control</li>
                           <li>Uniform heating</li>
                           <li>Safety features</li>
                           <li>Digital control system</li>
                           <li>Thermal insulation</li>
                         </ul>

                         <h4 className="text-xl font-semibold text-text-primary mb-4">Add-ons Attributes:</h4>
                         <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 mb-6">
                           <li>21 CFR part 11 Compliance</li>
                           <li>Mobile Alert System</li>
                           <li>Hooter System</li>
                           <li>Extra Trays</li>
                           <li>Scanner: 4 pt. temperature sensor</li>
                           <li>Door Access System (Numeric/Biometric)</li>
                         </ul>

                         <p className="text-sm text-text-secondary mt-4 italic">
                           Above are standard sizes and we can offer other (customised) sizes also V** = variant based upon construction of body
                         </p>
                       </div>
                     </div>
                   )}

                  {/* Call to Action */}
                  <div className="pt-8 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Interested in this product?</h3>
                        <p className="text-text-secondary text-lg">Get detailed specifications and pricing information</p>
                      </div>
                      <button 
                        onClick={() => setShowQuoteForm(true)}
                        className="bg-transparent border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-500/10 hover:text-white transition-all duration-200"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Select a Product</h2>
                    <p className="text-text-secondary text-lg">Choose a product from the left panel to view detailed information</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
                
        {showFooter && <Footer />}
        
        {/* Quote Request Form */}
        <QuoteRequestForm
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
          productName={selectedIndividualProduct?.name || selectedProduct || 'Product'}
        />
      </>
    )
  }

  // VIEW 2: PRODUCT OVERVIEW PAGE - When no product is selected
  // Shows: Full page with product categories, descriptions, and "View Products" buttons
  return (
    <>
      
      {/* Hero Section */}
      <section className="hero-section py-20 bg-background-off">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
                      <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Products
            </h1>
              <p className="text-xl text-text-secondary max-w-4xl mx-auto">
                Comprehensive range of pharmaceutical equipment and laboratory instruments designed for precision and compliance
            </p>
        </div>

          {/* Product Categories Hero */}
          <div className="space-y-16 w-full">
            {/* Stability Chambers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {productInfo.stabilityChambers.title}
                </h2>
                <p className="text-primary-500 font-medium text-lg">
                  {productInfo.stabilityChambers.subtitle}
                </p>
              </div>

              <div className="space-y-6 w-full">
                <div>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {productInfo.stabilityChambers.description}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">When</h3>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2">
                      {productInfo.stabilityChambers.when.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Why</h3>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2">
                      {productInfo.stabilityChambers.why.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Where</h3>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2">
                      {productInfo.stabilityChambers.where.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Table Top Instruments */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
              className="w-full"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {productInfo.tableTopInstruments.title}
                </h2>
                <p className="text-primary-500 font-medium text-lg">
                  {productInfo.tableTopInstruments.subtitle}
                </p>
                      </div>
              
              <div className="space-y-6 w-full">
                <div>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {productInfo.tableTopInstruments.description}
                  </p>
                    </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                    <h3 className="text-xl font-semibold mb-3">When</h3>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2">
                      {productInfo.tableTopInstruments.when.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Why</h3>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2">
                      {productInfo.tableTopInstruments.why.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Where</h3>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2">
                      {productInfo.tableTopInstruments.where.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-background-off">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Product Categories
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Precision-engineered solutions for pharmaceutical stability testing and laboratory quality control
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 w-full">
            {productCategories.map((category, index) => (
              <motion.div
                key={index}
                className="glass p-6 border border-white/20 rounded-lg shadow-lg h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-text-secondary mb-6">{category.description}</p>
                
                <div className="flex-1 mb-6">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="mb-4">
                      <h4 className="text-base font-semibold mb-2 border-l-2 border-primary-300 pl-3">
                        {subcategory.name}
                        </h4>
                      {subcategory.types.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {subcategory.types.map((type, typeIndex) => (
                            <span key={typeIndex} className="text-xs bg-transparent text-primary-500 px-3 py-1 rounded-full border border-primary-500 hover:bg-primary-500/10 hover:text-white transition-all duration-200">
                              {type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleViewProducts(category.title)}
                  className="w-full bg-transparent border-2 border-primary-500 text-primary-500 py-2 rounded text-sm mt-auto font-semibold hover:bg-primary-500/10 hover:text-white transition-all duration-200"
                >
                  Explore
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Quote Request Form */}
      <QuoteRequestForm
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        productName={selectedIndividualProduct?.name || selectedProduct || 'Product'}
      />
    </>
  )
}