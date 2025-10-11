"use server"

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { transaction } from "@/db/schema";

type TransactionType = typeof transaction.$inferInsert;

export async function createTransaction(input: TransactionType) {
	const result = await db.insert(transaction).values(input);
	revalidatePath(`/dashboard/${input.spending_tracker_id}`);
	return result;
};