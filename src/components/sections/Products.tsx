'use client'

import { Thermometer, Microscope } from 'lucide-react'
import { useRouter } from 'next/navigation'

const productCategories = [
  {
    title: 'Stability Chambers',
    description: 'Advanced environmental chambers for pharmaceutical stability testing with precise temperature and humidity control.',
    features: ['Temperature Control', 'Humidity Monitoring', 'Data Logging'],
    icon: Thermometer,
    image: '/images/stability-chamber-category.svg',
  },
  {
    title: 'Table Top Instruments',
    description: 'Compact laboratory instruments for quality control and research applications.',
    features: ['Analytical Equipment', 'Quality Control', 'Research Tools'],
    icon: Microscope,
    image: '/images/table-top-category.svg',
  },
]

export default function Products() {
  const router = useRouter()
  
  const handleViewProducts = (category: string) => {
    if (category === 'Stability Chambers') {
      router.push('/products?product=Stability%20Chambers')
    } else if (category === 'Table Top Instruments') {
      router.push('/products?product=Table%20Top%20Instruments')
    }
  }
  
  return (
    <section className="py-20 bg-background-off" style={{backgroundColor: '#f8f9fa'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Our Products
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Comprehensive range of pharmaceutical equipment and solutions
          </p>
        </div>

        {/* Products Showcase */}
        <div className="grid lg:grid-cols-2 gap-12">
          {productCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 w-full border border-white/30 shadow-lg"
            >
              <div className="flex flex-col gap-6">
                {/* Category Image */}
                <div className="flex justify-center">
                  <div className="w-full h-40 flex items-center justify-center">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Border Separator */}
                <div className="border-t border-gray-200/50 my-2"></div>

                {/* Category Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    {category.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {category.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {category.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-primary-500/10 text-primary-500 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleViewProducts(category.title)}
                    className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    View Products
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Text */}
        <div className="text-center mt-16">
          <p className="text-text-secondary text-base max-w-4xl mx-auto leading-relaxed">
            Our products are developed in strict adherence to international standards, including ICH guidelines and 21 CFR Part 11 compliance. Backed by comprehensive support, they ensure seamless, efficient, and fully compliant pharmaceutical operations.
          </p>
        </div>
      </div>
    </section>
  )
}
