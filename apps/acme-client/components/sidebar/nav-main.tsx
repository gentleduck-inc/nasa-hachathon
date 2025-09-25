'use client'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@acme/ui/sidebar'
import { cn } from '@gentleduck/libs/cn'
import { type Icon } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem className={cn(pathname === item.url && 'rounded-sm bg-zinc-800/10')} key={item.title}>
              <Link href={item.url} key={item.title}>
                <SidebarMenuButton className="cursor-pointer" tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
