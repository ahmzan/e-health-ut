import { useAuthState } from '@/hooks/use-auth-state'
import AdminLayout from './layout'
import { TypographyH3 } from '@/components/typography'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Label } from '@/components/ui/label'
import { database } from '@/lib/firebase'
import { onValue, ref, update } from 'firebase/database'
import { useNavigate, useSearchParams } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import type { KategoriData } from './kategori'

export default function AdminKategoriEditPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { user } = useAuthState()

  const [keyKategori, setKeyKategori] = useState<string>()
  // const [id, setId] = useStatxe<string>()
  const [name, setName] = useState<string>()

  const [error, setError] = useState<string>()

  const onSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      console.log('submit', name)

      const refArtikel = ref(database, 'kategories/' + keyKategori)

      update(refArtikel, { name })
        .then(() => navigate('/admin/kategori'))
        .catch(err => {
          console.log('err', err)

          if (err.message) setError(err.message)
        })
    },
    [keyKategori, name, navigate]
  )

  useEffect(() => {
    const key = searchParams.get('key')
    if (key) setKeyKategori(key)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const refKategori = ref(database, 'kategories/' + keyKategori)

    const unsub = onValue(refKategori, snap => {
      const data = snap.val() as KategoriData

      // setId(data.id)
      setName(data.name)
    })

    return () => unsub()
  }, [keyKategori])

  if (!keyKategori) return null

  if (!user) return null

  return (
    <AdminLayout>
      <TypographyH3>Edit Kategori</TypographyH3>
      <p className='text-muted-foreground text-sm'>{keyKategori}</p>

      {error && (
        <Alert variant='destructive'>
          <AlertTriangle />
          <AlertTitle>Terjadi kesalahan</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form method='POST' onSubmit={onSubmit} className='space-y-8'>
        <div className='grid w-full items-center gap-3'>
          <Label htmlFor='name'>Nama Kategori</Label>
          <Input
            type='text'
            id='name'
            placeholder='Nama Kategori'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <Button type='submit'>Ubah</Button>
      </form>
    </AdminLayout>
  )
}
