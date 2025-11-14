CREATE TABLE "player" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"activation_status" boolean DEFAULT true,
	"display_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "player_email_unique" UNIQUE("email"),
	CONSTRAINT "player_display_id_unique" UNIQUE("display_id")
);
--> statement-breakpoint
CREATE TABLE "player_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255),
	"websocket_client_id" varchar(255),
	"is_online" boolean DEFAULT false,
	"player_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "player_session" ADD CONSTRAINT "player_session_player_id_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("id") ON DELETE cascade ON UPDATE no action;