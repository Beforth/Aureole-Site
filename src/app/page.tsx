import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Values from '@/components/sections/Values'
import Products from '@/components/sections/Products'
import Catalogue from '@/components/sections/Catalogue'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main>
        <Hero />
        <About />
        <Values />
        <Products />
        <Catalogue />
      </main>
      <Footer />
    </>
  )
}
