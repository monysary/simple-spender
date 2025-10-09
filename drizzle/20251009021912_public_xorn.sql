DROP TABLE `user_profile`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_spending_tracker` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`monthly_max_spending` real
);
--> statement-breakpoint
INSERT INTO `__new_spending_tracker`("id", "created_at", "updated_at", "deleted_at", "name", "description", "monthly_max_spending") SELECT "id", "created_at", "updated_at", "deleted_at", "name", "description", "monthly_max_spending" FROM `spending_tracker`;--> statement-breakpoint
DROP TABLE `spending_tracker`;--> statement-breakpoint
ALTER TABLE `__new_spending_tracker` RENAME TO `spending_tracker`;--> statement-breakpoint
PRAGMA foreign_keys=ON;