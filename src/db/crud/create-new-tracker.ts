"use server"

import { db } from "@/db";
import { spending_tracker } from "@/db/schema";

type SpendingTracker = typeof spending_tracker.$inferInsert;

export async function createNewTracker(values: SpendingTracker) {
    const newTracker = await db.insert(spending_tracker).values(values);
    return newTracker;
};