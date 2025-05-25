const Contact = () => {
  return (
    <section id='kontak' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6 max-w-2xl'>
        <h3 className='text-3xl font-bold mb-12 text-center' data-aos='fade-up'>
          Kontak Kami
        </h3>
        <form className='bg-white shadow-lg rounded-lg p-8' data-aos='fade-up' data-aos-delay='100'>
          <div className='space-y-6'>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Nama</label>
              <input
                type='text'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Email</label>
              <input
                type='email'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Pesan</label>
              <textarea
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300 h-32'
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition duration-300'
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
