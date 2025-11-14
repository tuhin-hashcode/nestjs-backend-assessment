import { pgTable, serial, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

export const player = pgTable("player", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).unique(),
    activationStatus: boolean("activation_status").default(true),
    displayId: varchar("display_id", { length: 255 }).unique(),
    createdAt: timestamp("created_at").defaultNow(),
});
