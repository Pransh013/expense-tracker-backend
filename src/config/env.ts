import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().transform(Number).default("3001"),
  DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url({ message: "Redis URL must be valid" }),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "Redis token is required"),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
