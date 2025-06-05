import { database } from '@/lib/firebase'
import { type ArtikelData } from '@/pages/admin/artikel'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

const Artikel = () => {
  const [artikels, setArtikels] = useState<ArtikelData[]>([])

  useEffect(() => {
    const refArtikels = ref(database, 'artikels')

    const unsub = onValue(refArtikels, snapArtikels => {
      const dataArtikels: ArtikelData[] = []

      snapArtikels.forEach(snapArtikel => {
        const data = snapArtikel.val() as ArtikelData
        dataArtikels.push({ ...data, key: snapArtikel.key })
      })

      setArtikels(dataArtikels)
      console.log(dataArtikels)
    })

    return () => unsub()
  }, [])

  return (
    <section id='artikel' className='py-20 container mx-auto px-6'>
      <h3 className='text-3xl font-bold mb-12 text-center' data-aos='fade-up'>
        Artikel Kesehatan
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {artikels.map(artikel => (
          <div
            key={artikel.id}
            className='bg-white shadow-lg rounded-lg overflow-hidden card-hover'
            data-aos='fade-up'
            data-aos-delay='300'
          >
            <img src={artikel.imageUrl} alt={artikel.title} className='w-full h-48 object-cover' />
            <div className='p-6'>
              <h4 className='font-semibold text-xl mb-3'>{artikel.title}</h4>
              <p className='text-gray-600'>
                {artikel.content.length > 70 ? artikel.content.substring(0, 70) + '...' : artikel.content}
              </p>
              <a
                href={'/artikel/' + artikel.key}
                className='text-blue-800 font-semibold mt-4 inline-block hover:underline'
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Artikel
