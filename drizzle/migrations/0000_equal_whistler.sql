CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"price" real,
	"description" text,
	"image" varchar(256),
	"category_id" integer,
	"quantity" integer,
	"createdat" date,
	"updatedat" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"iscompleted" boolean,
	"updatedat" date,
	"createdat" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_groups" (
	"user_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "users_to_groups_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile_info" ADD CONSTRAINT "profile_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
