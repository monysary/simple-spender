import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

const base_table = {
  id: integer("id").primaryKey({ autoIncrement: true }),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: text('updated_at'),
  deleted_at: text('deleted_at')
};

export const spending_tracker = sqliteTable('spending_tracker', {
  ...base_table,
  name: text('name').notNull(),
  description: text('description'),
  monthly_max_spending: real('monthly_max_spending'),
  user_profile_id: text('user_profile_id').notNull().references(() => user_profile.id)
});

export const user_profile = sqliteTable('user_profile', {
  ...base_table,
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  monthly_income: real('monthly_income').notNull()
});

export const spending_period = sqliteTable('spending_period', {
  ...base_table,
  start_date: text('start_date').notNull(),
  end_date: text('end_date').notNull(),
  description: text('description'),
  spending_tracker_id: text('spending_tracker_id').notNull().references(() => spending_tracker.id)
});

export const recurring_charge = sqliteTable('recurring_charge', {
  ...base_table,
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  description: text('description'),
  type: text('type').notNull().references(() => recurring_charge_type.id)
});

export const recurring_charge_type = sqliteTable('recurring_charge_type', {
  ...base_table,
  system_name: text('system_name').notNull(),
  display_name: text('display_name').notNull(),
  order: integer('order')
});

export const transaction = sqliteTable('transaction', {
  ...base_table,
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  description: text('description'),
  date: text('date').notNull(),
  spending_period_id: text('spending_period_id').notNull().references(() => spending_period.id)
});