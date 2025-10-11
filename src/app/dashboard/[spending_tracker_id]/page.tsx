"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

import data from "./data.json"

import { spending_tracker } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type TrackerType = InferSelectModel<typeof spending_tracker>;

import { getSpendingTracker } from "@/db/crud/get-spending-tracker"

export default function DashboardPage() {
  const [tracker, setTracker] = useState<TrackerType | null>(null);

  const params = useParams<{ spending_tracker_id: string }>();
  const id = params.spending_tracker_id;

  useEffect(() => {
    (async () => {
      const data = await getSpendingTracker(id);
      setTracker(data);
    })();

  }, [id])

  return (
    <SidebarInset>
      <SiteHeader title={tracker?.name ?? ""} description={tracker?.description ?? ""} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
