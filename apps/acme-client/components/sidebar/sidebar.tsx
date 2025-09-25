'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@acme/ui/sidebar'
import { Asterisk } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

const data = {
  navMain: [
    {
      icon: Asterisk,
      title: 'Waste Materials',
      url: '/waste-materials',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link className="flex items-center gap-2 font-medium" href="/">
              <div className="flex size-6 items-center justify-center overflow-hidden rounded-md text-primary-foreground">
                <Image
                  alt="Image"
                  className="h-[52px] w-[100px] object-cover dark:brightness-[0.2] dark:grayscale"
                  height={200}
                  src="/placeholder.webp"
                  width={200}
                />
              </div>
              <code className="font-bold font-mono">@Acme</code>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {
          // <NavSecondary className="mt-auto" items={data.navMain} />
          // <NavDocuments items={data.} />
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
