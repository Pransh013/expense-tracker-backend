import ratelimit from "@/config/upstash";
import { NextFunction, Request, Response } from "express";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || "anonymous";
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

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
