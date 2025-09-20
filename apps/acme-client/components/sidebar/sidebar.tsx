'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@acme/ui/sidebar'
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { NavDocuments } from './nav-documents'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
import { NavUser } from './nav-user'

const data = {
  documents: [
    {
      icon: IconDatabase,
      name: 'Data Library',
      url: '#',
    },
    {
      icon: IconReport,
      name: 'Reports',
      url: '#',
    },
    {
      icon: IconFileWord,
      name: 'Word Assistant',
      url: '#',
    },
  ],
  navClouds: [
    {
      icon: IconCamera,
      isActive: true,
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
      title: 'Capture',
      url: '#',
    },
    {
      icon: IconFileDescription,
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
      title: 'Proposal',
      url: '#',
    },
    {
      icon: IconFileAi,
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
      title: 'Prompts',
      url: '#',
    },
  ],
  navMain: [
    {
      icon: IconDashboard,
      title: 'Dashboard',
      url: '#',
    },
    {
      icon: IconListDetails,
      title: 'Lifecycle',
      url: '#',
    },
    {
      icon: IconChartBar,
      title: 'Analytics',
      url: '#',
    },
    {
      icon: IconFolder,
      title: 'Projects',
      url: '#',
    },
    {
      icon: IconUsers,
      title: 'Team',
      url: '#',
    },
  ],
  navSecondary: [
    {
      icon: IconSettings,
      title: 'Settings',
      url: '#',
    },
    {
      icon: IconHelp,
      title: 'Get Help',
      url: '#',
    },
    {
      icon: IconSearch,
      title: 'Search',
      url: '#',
    },
  ],
  user: {
    avatar: 'https://avatars.githubusercontent.com/u/108896341',
    email: 'wildduck@iusevimbtw.com',
    name: 'Wildduck',
  },
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
              <code className="font-bold font-mono">@gentleduck</code>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary className="mt-auto" items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
