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
import { AlertTriangle, Check, Plus } from 'lucide-react'
import type { ArtikelData } from './artikel'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import type { KategoriData } from './kategori'

export default function AdminArtikelTambahPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { user } = useAuthState()

  const [keyArtikel, setKeyArtikel] = useState<string>()
  // const [id, setId] = useStatxe<string>()
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [category, setCategory] = useState<string[]>([])
  // const [author, setAuthor] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()

  const [error, setError] = useState<string>()

  const [kategoriOpen, setKategoriOpen] = useState<boolean>(false)
  const [kategories, setKategories] = useState<KategoriData[]>([])

  const onSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      console.log('submit', title, content, imageUrl)

      const refArtikel = ref(database, 'Article/' + keyArtikel)

      update(refArtikel, { title, content, imageUrl, category })
        .then(() => navigate('/admin/artikel'))
        .catch(err => {
          console.log('err', err)

          if (err.message) setError(err.message)
        })
    },
    [category, content, imageUrl, keyArtikel, navigate, title]
  )

  useEffect(() => {
    const key = searchParams.get('key')
    if (key) setKeyArtikel(key)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  useEffect(() => {
    const refArtikel = ref(database, 'Article/' + keyArtikel)

    const unsub = onValue(refArtikel, snap => {
      const data = snap.val() as ArtikelData

      // setId(data.id)
      setTitle(data.title)
      setContent(data.content)
      setImageUrl(data.imageUrl)
      setCategory(data.category ?? [])
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
            autoComplete='off'
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
            autoComplete='off'
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

        <div className='grid w-full items-center gap-3'>
          <Label>Kategori</Label>

          <div className='flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center'>
            <p className='text-sm leading-none font-medium'>
              {category.map(cat => (
                <span key={cat} className='bg-primary text-primary-foreground mr-2 rounded-lg px-2 py-1 text-xs'>
                  {cat}
                </span>
              ))}
            </p>

            <Popover open={kategoriOpen} onOpenChange={setKategoriOpen}>
              <PopoverTrigger asChild>
                <Button variant='ghost'>
                  <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Kategori' autoFocus className='h-9' />
                  <CommandList>
                    <CommandEmpty>Tidak ada kategori tersebut</CommandEmpty>
                    <CommandGroup>
                      {kategories.map(kategori => (
                        <CommandItem
                          key={kategori.id}
                          value={kategori.name}
                          onSelect={value => {
                            if (category.includes(value)) {
                              // Deselect

                              setCategory(category.filter(value => value !== kategori.name))
                            } else {
                              // Select
                              setCategory([...category, value])
                            }
                          }}
                        >
                          {kategori.name}
                          {category.includes(kategori.name) && <Check className='ml-auto' />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type='submit'>Ubah</Button>
      </form>
    </AdminLayout>
  )
}
