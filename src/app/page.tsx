import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddNewTracker } from "@/components/add-new-tracker";

import { db } from "@/db";
import { recurring_charge_type } from "@/db/schema";

export default async function Home() {
  const types = await db.select().from(recurring_charge_type);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 m-auto p-10">
      <Link href="/dashboard">
        <Button variant="outline">Go to Dashboard</Button>
      </Link>

      <AddNewTracker />
    </div>
  );
}
