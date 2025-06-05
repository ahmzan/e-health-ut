import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthState } from '@/hooks/use-auth-state'
import type React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthState()
  const navigate = useNavigate()

  if (!loading && !user) navigate('/login')

  if (loading && !user) return <p>Loading...</p>

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
