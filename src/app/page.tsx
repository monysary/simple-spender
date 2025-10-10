import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddNewTracker } from "@/components/add-new-tracker";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import { getAllSpendingTrackers } from "@/db/crud/get-all-spending-trackers";

export default async function Home() {
  const trackers = await getAllSpendingTrackers();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 m-auto p-10 max-w-xl">
      <AddNewTracker />

      <Separator className="my" />

      <div className="flex flex-col gap-4 w-full">
        {trackers.map(tracker => {
          return (
            <Link key={tracker.id} href={`/dashboard/${tracker.id}`}>
              <Card className="hover:bg-slate-500/50">
                <CardHeader>
                  <CardTitle>{tracker.name}</CardTitle>
                  <CardDescription>{tracker.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
