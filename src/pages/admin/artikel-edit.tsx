import { useAuthState } from '@/hooks/use-auth-state'
import AdminLayout from './layout'
import { TypographyH3 } from '@/components/typography'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { database } from '@/lib/firebase'
import { onValue, ref, update } from 'firebase/database'
import { useNavigate, useSearchParams } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import type { ArtikelData } from './artikel'

export default function AdminArtikelTambahPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { user } = useAuthState()

  const [keyArtikel, setKeyArtikel] = useState<string>()
  // const [id, setId] = useStatxe<string>()
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  // const [category, setCategory] = useState<string[]>()
  // const [author, setAuthor] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()

  const [error, setError] = useState<string>()

  const onSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      console.log('submit', title, content, imageUrl)

      const refArtikel = ref(database, 'artikels/' + keyArtikel)

      update(refArtikel, { title, content, imageUrl })
        .then(() => navigate('/admin/artikel'))
        .catch(err => {
          console.log('err', err)

          if (err.message) setError(err.message)
        })
    },
    [content, imageUrl, keyArtikel, navigate, title]
  )

  useEffect(() => {
    const key = searchParams.get('key')
    if (key) setKeyArtikel(key)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const refArtikel = ref(database, 'artikels/' + keyArtikel)

    const unsub = onValue(refArtikel, snap => {
      const data = snap.val() as ArtikelData

      // setId(data.id)
      setTitle(data.title)
      setContent(data.content)
      setImageUrl(data.imageUrl)
    })

    return () => unsub()
  }, [keyArtikel])

  if (!keyArtikel) return null

  if (!user) return null

  return (
    <AdminLayout>
      <TypographyH3>Edit Artikel</TypographyH3>
      <p className='text-muted-foreground text-sm'>{keyArtikel}</p>

      {error && (
        <Alert variant='destructive'>
          <AlertTriangle />
          <AlertTitle>Terjadi kesalahan</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form method='POST' onSubmit={onSubmit} className='space-y-8'>
        <div className='grid w-full items-center gap-3'>
          <Label htmlFor='title'>Judul Artikel</Label>
          <Input
            type='text'
            id='title'
            placeholder='Judul Artikel'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='grid w-full gap-3'>
          <Label htmlFor='content'>Konten</Label>
          <Textarea
            placeholder='Konten artikel'
            id='content'
            rows={10}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className='grid w-full items-center gap-3'>
          <Label htmlFor='imageUrl'>URL Gambar</Label>
          <Input
            type='url'
            id='imageUrl'
            placeholder='https://...'
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            autoComplete='off'
          />
        </div>

        <Button type='submit'>Ubah</Button>
      </form>
    </AdminLayout>
  )
}
