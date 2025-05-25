const Artikel = () => {
  return (
    <section id='artikel' className='py-20 container mx-auto px-6'>
      <h3 className='text-3xl font-bold mb-12 text-center' data-aos='fade-up'>
        Artikel Kesehatan
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div
          className='bg-white shadow-lg rounded-lg overflow-hidden card-hover'
          data-aos='fade-up'
          data-aos-delay='100'
        >
          <img
            src='https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            alt='Olahraga'
            className='w-full h-48 object-cover'
          />
          <div className='p-6'>
            <h4 className='font-semibold text-xl mb-3'>Manfaat Olahraga Rutin</h4>
            <p className='text-gray-600'>
              Olahraga membantu menjaga kebugaran, meningkatkan mood, dan mencegah penyakit...
            </p>
            <a href='#' className='text-blue-800 font-semibold mt-4 inline-block hover:underline'>
              Baca Selengkapnya →
            </a>
          </div>
        </div>
        <div
          className='bg-white shadow-lg rounded-lg overflow-hidden card-hover'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <img
            src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            alt='Makanan Sehat'
            className='w-full h-48 object-cover'
          />
          <div className='p-6'>
            <h4 className='font-semibold text-xl mb-3'>Makanan Sehat untuk Jantung</h4>
            <p className='text-gray-600'>
              Mengonsumsi sayur, buah, dan biji-bijian baik untuk menjaga kesehatan jantung...
            </p>
            <a href='#' className='text-blue-800 font-semibold mt-4 inline-block hover:underline'>
              Baca Selengkapnya →
            </a>
          </div>
        </div>
        <div
          className='bg-white shadow-lg rounded-lg overflow-hidden card-hover'
          data-aos='fade-up'
          data-aos-delay='300'
        >
          <img
            src='https://images.unsplash.com/photo-1511295742362-92c96b1cf484?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            alt='Tips Tidur Berkualitas'
            className='w-full h-48 object-cover'
          />
          <div className='p-6'>
            <h4 className='font-semibold text-xl mb-3'>Tips Tidur Berkualitas</h4>
            <p className='text-gray-600'>
              Tidur cukup dan berkualitas sangat penting untuk kesehatan mental dan fisik...
            </p>
            <a href='#' className='text-blue-800 font-semibold mt-4 inline-block hover:underline'>
              Baca Selengkapnya →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Artikel
