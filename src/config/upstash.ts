import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env";

const redis = new Redis({
  token: env.UPSTASH_REDIS_REST_TOKEN,
  url: env.UPSTASH_REDIS_REST_URL,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, "10 s"),
  analytics: true,
});

export default ratelimit;
