"use server"

import { db } from "@/db";
import { transaction } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllTransactions(id: string) {
  const results = await db.select().from(transaction).where(eq(transaction.spending_tracker_id, id));
  
  return results;
};