import { useAuthState } from '@/hooks/use-auth-state'
import AdminLayout from './layout'

export default function AdminPage() {
  const { user } = useAuthState()

  return <AdminLayout>Selamat datang, {user?.email}</AdminLayout>
}
