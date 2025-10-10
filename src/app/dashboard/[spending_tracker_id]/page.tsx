import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

import { getSpendingTracker } from "@/db/crud/get-spending-tracker"

export default async function DashboardPage(props: {
  params: Promise<{ spending_tracker_id: string }>;
}) {
  const { spending_tracker_id } = await props.params;
  const [tracker] = await getSpendingTracker(spending_tracker_id);

  return (
    <SidebarInset>
      <SiteHeader title={tracker.name} />
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
