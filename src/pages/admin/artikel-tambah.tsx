import { useAuthState } from '@/hooks/use-auth-state'
import AdminLayout from './layout'
import { TypographyH3 } from '@/components/typography'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { useCallback, useState, type FormEvent } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { database } from '@/lib/firebase'
import { push, ref, set } from 'firebase/database'
import { useNavigate } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function AdminArtikelTambahPage() {
  const navigate = useNavigate()

  const { user } = useAuthState()

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

      const uuid = crypto.randomUUID()

      const refArtikels = ref(database, 'artikels')

      const refNewArtikel = push(refArtikels)

      set(refNewArtikel, { id: uuid, title, content, imageUrl })
        .then(() => navigate('/admin/artikel'))
        .catch(err => {
          console.log('err', err)

          if (err.message) setError(err.message)
        })
    },
    [content, imageUrl, navigate, title]
  )

  if (!user) return null

  return (
    <AdminLayout>
      <TypographyH3>Tambah Artikel</TypographyH3>

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
          <Input type='text' id='title' placeholder='Judul Artikel' onChange={e => setTitle(e.target.value)} />
        </div>

        <div className='grid w-full gap-3'>
          <Label htmlFor='content'>Konten</Label>
          <Textarea placeholder='Konten artikel' id='content' rows={10} onChange={e => setContent(e.target.value)} />
        </div>

        <div className='grid w-full items-center gap-3'>
          <Label htmlFor='imageUrl'>URL Gambar</Label>
          <Input
            type='url'
            id='imageUrl'
            placeholder='https://...'
            onChange={e => setImageUrl(e.target.value)}
            autoComplete='off'
          />
        </div>

        <Button type='submit'>Tambah</Button>
      </form>
    </AdminLayout>
  )
}
