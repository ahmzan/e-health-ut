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

export interface KategoriData {
  key: string
  id: string
  name: string
}

export default function AdminKategoriPage() {
  const navigate = useNavigate()

  const { user } = useAuthState()

  const [kategories, setKategories] = useState<KategoriData[]>([])

  const refKategories = ref(database, 'kategories')

  useEffect(() => {
    const unsub = onValue(refKategories, snapKategories => {
      const dataKategories: KategoriData[] = []

      snapKategories.forEach(snapKategori => {
        const data = snapKategori.val() as KategoriData
        dataKategories.push({ ...data, key: snapKategori.key })
      })

      setKategories(dataKategories)
    })

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return null

  return (
    <AdminLayout>
      <TypographyH3>Manajemen Kategori</TypographyH3>
      <div className='flex flex-row justify-end'>
        <Button onClick={() => navigate('/admin/kategori-tambah')}>Tambah Kategori</Button>
      </div>
      <Table>
        <TableCaption>Daftar Artikel</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kategori</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kategories.map(artikel => (
            <TableRow key={artikel.key}>
              <TableCell>{artikel.name}</TableCell>
              <TableCell>
                <Button size='sm' onClick={() => navigate('/admin/kategori-edit?key=' + artikel.key)}>
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
                      <AlertDialogTitle>Anda akan menghapus kategori?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini bersifat permamen tidak dapat di batalkan
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const refArtikel = ref(database, 'kategories/' + artikel.key)

                          remove(refArtikel).then(() => navigate('/admin/kategori'))
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
