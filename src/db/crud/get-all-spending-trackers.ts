"use server"

import { db } from "@/db";
import { spending_tracker } from "@/db/schema";

export async function getAllSpendingTrackers() {
  const spendingTrackers = await db.select().from(spending_tracker);
  
  return spendingTrackers;
};