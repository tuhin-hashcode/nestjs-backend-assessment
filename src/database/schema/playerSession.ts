import { pgTable, serial, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { player } from "./player";
import { relations } from "drizzle-orm";

export const playerSession = pgTable("player_session", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 255 }),
    websocketClientId: varchar("websocket_client_id", { length: 255 }),
    isOnline: boolean("is_online").default(false),
    playerId: integer("player_id").references(() => player.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});
