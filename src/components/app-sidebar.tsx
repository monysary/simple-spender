"use client"

import * as React from "react"
import {
  IconArrowLeft,
  IconDashboard,
  IconReceipt,
  IconPig,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useParams } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const id = params.spending_tracker_id;

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/dashboard/${id}`,
        icon: IconDashboard,
      },
      {
        title: "Expenses",
        url: `/dashboard/${id}/expenses`,
        icon: IconReceipt,
      },
      {
        title: "Savings",
        url: `/dashboard/${id}/savings`,
        icon: IconPig,
      }
    ],
  }


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconArrowLeft />
                <span className="text-base font-semibold">Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
