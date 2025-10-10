"use server"

import { db } from "@/db";
import { spending_tracker } from "@/db/schema";

export async function getSpendingTracker() {
  const spendingTrackers = await db.select().from(spending_tracker);
  
  return spendingTrackers;
};