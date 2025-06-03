import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Artikel from '@/components/Artikel'
import Kategori from '@/components/Kategori'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 1000,
  once: true
})

function HomePage() {
  return (
    <div className='bg-gray-50 text-gray-800'>
      <Navbar />
      <Hero />
      <Artikel />
      <Kategori />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage
