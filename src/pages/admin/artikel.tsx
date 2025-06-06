import { useAuthState } from '@/hooks/use-auth-state'
import AdminLayout from './layout'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { TypographyH3 } from '@/components/typography'
import { useEffect, useState } from 'react'
import { onValue, ref, remove } from 'firebase/database'
import { database } from '@/lib/firebase'
import { useNavigate } from 'react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

export interface ArtikelData {
  key: string
  id: string
  title: string
  content: string
  category: string[]
  imageUrl: string
}

export default function AdminArtikelPage() {
  const navigate = useNavigate()

  const { user } = useAuthState()

  const [artikels, setArtikels] = useState<ArtikelData[]>([])

  const refArtikels = ref(database, 'artikels')

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return null

  return (
    <AdminLayout>
      <TypographyH3>Manajemen Artikel</TypographyH3>
      <div className='flex flex-row justify-end'>
        <Button onClick={() => navigate('/admin/artikel-tambah')}>Tambah Artikel</Button>
      </div>
      <Table>
        <TableCaption>Daftar Artikel</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Konten</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artikels.map(artikel => (
            <TableRow key={artikel.title}>
              <TableCell>
                {artikel.title.length > 30 ? artikel.title.substring(0, 30) + '...' : artikel.title}
              </TableCell>
              <TableCell>
                <p className='flex flex-wrap'>
                  {artikel.content.length > 50 ? artikel.content.substring(0, 50) + '...' : artikel.content}
                </p>
              </TableCell>
              <TableCell>{artikel.category ? artikel.category.join(', ') : '-'}</TableCell>
              <TableCell>
                <Button size='sm' onClick={() => navigate('/admin/artikel-edit?key=' + artikel.key)}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size='sm' variant='destructive'>
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Anda akan menghapus artikel?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini bersifat permamen tidak dapat di batalkan
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const refArtikel = ref(database, 'artikels/' + artikel.key)

                          remove(refArtikel).then(() => navigate('/admin/artikel'))
                        }}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  )
}
