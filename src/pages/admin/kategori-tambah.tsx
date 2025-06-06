import { useAuthState } from '@/hooks/use-auth-state'
import AdminLayout from './layout'
import { TypographyH3 } from '@/components/typography'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { useCallback, useState, type FormEvent } from 'react'
import { Label } from '@/components/ui/label'
import { database } from '@/lib/firebase'
import { push, ref, set } from 'firebase/database'
import { useNavigate } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function AdminKategoriTambahPage() {
  const navigate = useNavigate()

  const { user } = useAuthState()

  const [name, setName] = useState<string>()

  const [error, setError] = useState<string>()

  const onSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      console.log('submit', name)

      const uuid = crypto.randomUUID()

      const refKategories = ref(database, 'kategories')

      const refNewKategories = push(refKategories)

      set(refNewKategories, { id: uuid, name })
        .then(() => navigate('/admin/kategori'))
        .catch(err => {
          console.log('err', err)

          if (err.message) setError(err.message)
        })
    },
    [navigate, name]
  )

  if (!user) return null

  return (
    <AdminLayout>
      <TypographyH3>Tambah Kategori</TypographyH3>

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
            onChange={e => setName(e.target.value)}
            autoComplete='off'
          />
        </div>

        <Button type='submit'>Tambah</Button>
      </form>
    </AdminLayout>
  )
}
