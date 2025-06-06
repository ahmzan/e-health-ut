import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { database } from '@/lib/firebase'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router'
import type { ArtikelData } from '../admin/artikel'

export default function ArtikelPage() {
  const params = useParams()

  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [category, setCategory] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    const key = params.key
    if (!key) return

    const refArtikel = ref(database, 'artikels/' + key)

    onValue(refArtikel, snap => {
      const data = snap.val() as ArtikelData

      setTitle(data.title)
      setContent(data.content)
      setImageUrl(data.imageUrl)
      setCategory(data.category)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-gray-50 text-gray-800 relative'>
      <Navbar />

      <div id='a' className='pt-16' data-aos='fade-up' data-aos-delay='300'>
        <img src={imageUrl} alt={title} className='w-full h-96 object-cover' />
        <div className='container mx-auto space-y-8 py-6 px-4'>
          <h1 className='text-4xl font-extrabold text-balance'>{title}</h1>
          <p>
            {category.map(category => (
              <span key={category} className='bg-primary text-primary-foreground mr-2 rounded-lg px-2 py-1 text-xs'>
                {category}
              </span>
            ))}
          </p>
          <p className='indent-8 leading-relaxed text-justify'>{content}</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
