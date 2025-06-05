import * as React from 'react'
import { Command, Newspaper, ShieldPlus, Tags } from 'lucide-react'

import { NavMenu } from '@/components/nav-menu'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useAuthState } from '@/hooks/use-auth-state'

const data = {
  menu: [
    {
      name: 'Beranda',
      url: '/admin',
      icon: Command
    },
    {
      name: 'Artikel',
      url: '/admin/artikel',
      icon: Newspaper
    },
    {
      name: 'Kategori',
      url: '/admin/kategori',
      icon: Tags
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthState()

  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <ShieldPlus className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>E-Health</span>
                  <span className='truncate text-xs'>Universitas Terbuka</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu menu={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser user={{ name: user.displayName ?? '', email: user.email ?? '', avatar: user.photoURL ?? '' }} />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
