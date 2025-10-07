import { db } from "./index";
import { recurring_charge_type } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  const existing = db.select().from(recurring_charge_type).all();

  if (existing.length > 0) {
    console.log("✅ Database already seeded, skipping.");
    return;
  }

  db.insert(recurring_charge_type).values([
    { id: 1, system_name: "expense", display_name: "Expense", order: 1 },
    { id: 2, system_name: "saving", display_name: "Saving", order: 2 },
  ]).run();

  console.log("✅ Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Error seeding DB:", err);
});
