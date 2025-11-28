import { Client } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not defined");

export const client = new Client(process.env.DATABASE_URL);
