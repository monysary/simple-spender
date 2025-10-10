"use server"

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { spending_tracker } from "@/db/schema";

type SpendingTracker = typeof spending_tracker.$inferInsert;

export async function createNewTracker(values: SpendingTracker) {
    const result = await db.insert(spending_tracker).values(values);
    revalidatePath("/");
    return result;
};