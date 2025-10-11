"use server"

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { spending_tracker } from "@/db/schema";

type SpendingTrackerType = typeof spending_tracker.$inferInsert;

export async function createNewTracker(values: SpendingTrackerType) {
    const result = await db.insert(spending_tracker).values(values);
    revalidatePath("/");
    return result;
};