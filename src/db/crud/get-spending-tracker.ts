"use server"

import { db } from "@/db";
import { spending_tracker } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSpendingTracker(id: string) {
  const result = await db
    .select()
    .from(spending_tracker)
    .where(eq(spending_tracker.id, id))
    .limit(1);
  
  return result;
};