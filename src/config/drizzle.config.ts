import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
    schema: "./src/database/schema",
    out: "./src/database/migrations",

    dialect: "postgresql",
    dbCredentials: {
        host: process.env.DATABASE_HOST!,
        port: Number(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_DB!,
        ssl: process.env.IS_LOCAL_DB === "true" ? false : { rejectUnauthorized: false },
    },
} satisfies Config;
