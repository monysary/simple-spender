CREATE TABLE `recurring_charge` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`description` text,
	`type` text NOT NULL,
	FOREIGN KEY (`type`) REFERENCES `recurring_charge_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recurring_charge_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`system_name` text NOT NULL,
	`display_name` text NOT NULL,
	`order` integer
);
--> statement-breakpoint
CREATE TABLE `spending_period` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`description` text,
	`spending_tracker_id` text NOT NULL,
	FOREIGN KEY (`spending_tracker_id`) REFERENCES `spending_tracker`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `spending_tracker` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`monthly_max_spending` real,
	`user_profile_id` text NOT NULL,
	FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`description` text,
	`date` text NOT NULL,
	`spending_period_id` text NOT NULL,
	FOREIGN KEY (`spending_period_id`) REFERENCES `spending_period`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`monthly_income` real NOT NULL
);
