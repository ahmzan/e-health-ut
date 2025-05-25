const Kategori = () => {
  return (
    <section id='kategori' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <h3 className='text-3xl font-bold mb-12 text-center' data-aos='fade-up'>
          Kategori Kesehatan
        </h3>
        <div className='flex flex-wrap justify-center gap-6' data-aos='fade-up' data-aos-delay='100'>
          <a
            href='#'
            className='bg-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300 text-blue-800 font-semibold'
          >
            Gaya Hidup
          </a>
          <a
            href='#'
            className='bg-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300 text-blue-800 font-semibold'
          >
            Penyakit
          </a>
          <a
            href='#'
            className='bg-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300 text-blue-800 font-semibold'
          >
            Nutrisi
          </a>
          <a
            href='#'
            className='bg-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300 text-blue-800 font-semibold'
          >
            Kesehatan Mental
          </a>
        </div>
      </div>
    </section>
  )
}

export default Kategori
