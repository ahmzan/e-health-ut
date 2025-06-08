import { database } from '@/lib/firebase'
import type { KategoriData } from '@/pages/admin/kategori'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

const Kategori = () => {
  const [kategories, setKategories] = useState<KategoriData[]>([])

  useEffect(() => {
    const refKategories = ref(database, 'Category')

    const unsub = onValue(refKategories, snapKategories => {
      const dataKategories: KategoriData[] = []

      snapKategories.forEach(snapKategori => {
        const data = snapKategori.val() as KategoriData
        dataKategories.push({ ...data, key: snapKategori.key })
      })

      setKategories(dataKategories)
    })

    return () => unsub()
  }, [])

  return (
    <section id='kategori' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <h3 className='text-3xl font-bold mb-12 text-center' data-aos='fade-up'>
          Kategori Kesehatan
        </h3>
        <div className='flex flex-wrap justify-center gap-6' data-aos='fade-up' data-aos-delay='100'>
          {kategories.map(kategori => (
            <a
              key={kategori.id}
              href={'/?kategori=' + kategori.name}
              className='bg-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition duration-300 text-blue-800 font-semibold'
            >
              {kategori.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Kategori
