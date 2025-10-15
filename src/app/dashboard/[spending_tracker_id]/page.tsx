"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

import { getSpendingTracker } from "@/db/crud/get-spending-tracker"
import { getAllTransactions } from "@/db/crud/get-all-transactions"
import { spending_tracker, transaction } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type TrackerType = InferSelectModel<typeof spending_tracker>;
type TransactionRow = {
  id: string;
  name: string;
  date: Date;
  amount: number;
  description: string;
};

export default function DashboardPage() {
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [transactions, setTransactions] = useState<TransactionRow[]>([])

  const params = useParams<{ spending_tracker_id: string }>();
  const id = params.spending_tracker_id;

  useEffect(() => {
    (async () => {
      const trackerData = await getSpendingTracker(id);
      setTracker(trackerData);

      const transactionData = await getAllTransactions(id);
      const formattedTransactionData = transactionData.map(data => ({
        id: data.id,
        name: data.name,
        date: new Date(data.date),
        amount: data.amount,
        description: data.description ?? "",
      }))
      setTransactions(formattedTransactionData);
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
            <DataTable data={transactions} />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
