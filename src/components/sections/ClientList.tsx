'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const clients = [
  // Row 1
  { name: "ENRICO PHARMACEUTICALS", logo: "/images/clients/enrico-pharmaceuticals.png" },
  { name: "GNE LIFESCIENCES", logo: "/images/clients/gne-lifesciences.png" },
  { name: "AUROBINDO", logo: "/images/clients/aurobindo.png" },
  { name: "Anthem BioSciences", logo: "/images/clients/anthem-biosciences.png" },
  { name: "Ekanthika", logo: "/images/clients/ekanthika.png" },
  { name: "MEHA PHARMA", logo: "/images/clients/meha-pharma.png" },
  { name: "TORQUE", logo: "/images/clients/torque.png" },
  { name: "Italab (GOA) PVT. Ltd.", logo: "/images/clients/italab.png" },
  { name: "SHAMROCK", logo: "/images/clients/shamrock.png" },
  
  // Row 2
  { name: "ADVAMA GUMMIES AND MORE", logo: "/images/clients/advama.png" },
  { name: "Eris", logo: "/images/clients/eris.png" },
  { name: "GENTECH", logo: "/images/clients/gentech.png" },
  { name: "cohance lifesciences", logo: "/images/clients/cohance.png" },
  { name: "Dabur", logo: "/images/clients/dabur.png" },
  { name: "JENERX PHARMA SOLUTIONS", logo: "/images/clients/jenerx.png" },
  { name: "ModHike", logo: "/images/clients/modhike.png" },
  { name: "MACLEODS", logo: "/images/clients/macleods.png" },
  { name: "PREGNA INTERNATIONAL LTD.", logo: "/images/clients/pregna.png" },
  
  // Row 3
  { name: "AYKA PHARMA", logo: "/images/clients/ayka-pharma.png" },
  { name: "ajanta pharma limited", logo: "/images/clients/ajanta-pharma.png" },
  { name: "Azista TBST AEROSPACE", logo: "/images/clients/azista.png" },
  { name: "GIB", logo: "/images/clients/gib.png" },
  { name: "GNOSIS", logo: "/images/clients/gnosis.png" },
  { name: "KRUX Pharma Pvt Ltd", logo: "/images/clients/krux-pharma.png" },
  { name: "Meril", logo: "/images/clients/meril.png" },
  { name: "Recipharm", logo: "/images/clients/recipharm.png" },
  { name: "TCG Lifesciences", logo: "/images/clients/tcg-lifesciences.png" },
  
  // Row 4
  { name: "AKUMS", logo: "/images/clients/akums.png" },
  { name: "Arene Lifesciences Limited", logo: "/images/clients/arene.png" },
  { name: "biovonic HEALTHCARE PVT. LTD.", logo: "/images/clients/biovonic.png" },
  { name: "SRF", logo: "/images/clients/srf.png" },
  { name: "HETERO", logo: "/images/clients/hetero.png" },
  { name: "KAMLA GROUP OF COMPANIES", logo: "/images/clients/kamla-group.png" },
  { name: "Lee Pharma Limited", logo: "/images/clients/lee-pharma.png" },
  { name: "PLICA VACCINES", logo: "/images/clients/plica-vaccines.png" },
  { name: "PIS LifeSciences", logo: "/images/clients/pis-lifesciences.png" },
  
  // Row 5
  { name: "alchem", logo: "/images/clients/alchem.png" },
  { name: "exemed pharmaceuticals", logo: "/images/clients/exemed.png" },
  { name: "DifGen Pharmaceuticals", logo: "/images/clients/difgen.png" },
  { name: "COVALENT", logo: "/images/clients/covalent.png" },
  { name: "G with Green Accent", logo: "/images/clients/g-green-accent.png" },
  { name: "INDIAN IMMUNOLOGICALS LIMITED", logo: "/images/clients/indian-immunologicals.png" },
  { name: "Laxachem", logo: "/images/clients/laxachem.png" },
  { name: "ronam healthcare", logo: "/images/clients/ronam.png" },
  { name: "SPM Medicare", logo: "/images/clients/spm-medicare.png" },
  
  // Row 6
  { name: "Finemax", logo: "/images/clients/finemax.png" },
  { name: "COTEC", logo: "/images/clients/cotec.png" },
  { name: "hpl Himachal Polyolefins Limited", logo: "/images/clients/hpl.png" },
  { name: "ANG Lifesciences", logo: "/images/clients/ang-lifesciences.png" },
  { name: "CHRIS-EJIR GROUP OF COMPANIES", logo: "/images/clients/chris-ejir.png" },
  { name: "indoco INDOCO REMEDIES LIMITED", logo: "/images/clients/indoco.png" },
  { name: "LOUKAS HEALTHCARE", logo: "/images/clients/loukas.png" },
  { name: "SGS", logo: "/images/clients/sgs.png" },
  { name: "Otsuka", logo: "/images/clients/otsuka.png" },
  
  // Row 7
  { name: "GL Galpha Laboratories Limited", logo: "/images/clients/galpha.png" },
  { name: "Callidus", logo: "/images/clients/callidus.png" },
  { name: "DCL Dharmo Care Labs", logo: "/images/clients/dcl.png" },
  { name: "goodway", logo: "/images/clients/goodway.png" },
  { name: "INTAS", logo: "/images/clients/intas.png" },
  { name: "CORAL LABORATORIES LTD", logo: "/images/clients/coral-labs.png" },
  { name: "Leiutis", logo: "/images/clients/leiutis.png" },
  { name: "Olive HEALTHCARE", logo: "/images/clients/olive-healthcare.png" },
  { name: "THEMIS MEDICARE", logo: "/images/clients/themis-medicare.png" },
  
  // Row 8
  { name: "ITC Labs", logo: "/images/clients/itc-labs.png" },
  { name: "Hamdard", logo: "/images/clients/hamdard.png" },
  { name: "HIGGS HEALTHCARE", logo: "/images/clients/higgs.png" },
  { name: "H&H HEALTHCARE AND COSMETICS PVT LTD", logo: "/images/clients/hh-healthcare.png" },
  { name: "hF in Hexagon", logo: "/images/clients/hf-hexagon.png" },
  { name: "UNIMARK REMEDIES LIMITED", logo: "/images/clients/unimark.png" },
  { name: "Legency Remedies Pvt. Ltd.", logo: "/images/clients/legency.png" },
  { name: "NATURIS cosmetics", logo: "/images/clients/naturis.png" }
]

export default function ClientList() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    const scrollDistance = scrollWidth - clientWidth

    const animate = () => {
      if (container.scrollLeft >= scrollDistance) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft += 1
      }
    }

    const interval = setInterval(animate, 30) // Adjust speed here

    return () => clearInterval(interval)
  }, [])

  return (
         <section className="py-12 bg-background-off relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-color/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-3xl font-bold text-text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Trusted Clients
          </motion.h2>
          <motion.p 
            className="text-text-secondary text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Serving leading pharmaceutical and healthcare companies worldwide
          </motion.p>
        </div>

                 {/* Client Logos Container */}
         <div className="relative">
           {/* Scrolling container */}
           <div 
             ref={containerRef}
             className="flex items-center space-x-8 overflow-hidden"
             style={{ scrollBehavior: 'smooth' }}
           >
            {/* Duplicate clients for seamless loop */}
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
              >
                                 <div className="bg-white rounded-lg px-6 py-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 min-w-[180px] text-center">
                   <div className="flex items-center justify-center h-16 mb-2">
                     <img 
                       src={client.logo} 
                       alt={client.name}
                       className="max-h-full max-w-full object-contain"
                       onError={(e) => {
                         // Fallback to text if image fails to load
                         const target = e.target as HTMLImageElement;
                         target.style.display = 'none';
                         target.nextElementSibling?.classList.remove('hidden');
                       }}
                     />
                     <div className="text-sm font-semibold text-text-primary hidden">
                       {client.name.split(' ')[0]}
                     </div>
                   </div>
                   <div className="text-xs text-text-secondary">
                     {client.name.length > 20 ? client.name.substring(0, 20) + '...' : client.name}
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-primary-color font-medium text-lg">
            We are there with you
          </p>
        </motion.div>
      </div>
    </section>
  )
}
