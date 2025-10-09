import Link from "next/link";
import { Button } from "@/components/ui/button";

import { db } from "@/db";
import { recurring_charge_type } from "@/db/schema";

export default async function Home() {
  const types = await db.select().from(recurring_charge_type);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/dashboard">
        <Button variant="outline">Go to Dashboard</Button>
      </Link>
    </div>
  );
}
