const Hero = () => {
  return (
    <section id='home' className='hero-gradient text-white pt-32 pb-20'>
      <div className='container mx-auto px-6 text-center' data-aos='fade-up'>
        <h2 className='text-5xl font-bold mb-6'>Selamat Datang di E-Health</h2>
        <p className='text-xl mb-8 max-w-2xl mx-auto'>Sumber informasi kesehatan terpercaya untuk Anda dan keluarga.</p>
        <a
          href='#artikel'
          className='bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300'
        >
          Jelajahi Artikel
        </a>
      </div>
    </section>
  )
}

export default Hero
