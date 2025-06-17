import ratelimit from "@/config/upstash";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const key = userId || req.ip || "anonymous";
  const { success, limit, remaining, reset } = await ratelimit.limit(key);

  res.setHeader("X-RateLimit-Limit", limit);
  res.setHeader("X-RateLimit-Remaining", remaining);
  res.setHeader("X-RateLimit-Reset", reset);

  if (!success) {
    res.status(429).json({ message: "Too many requests" });
    return;
  }

  next();
};

export default rateLimiter;
