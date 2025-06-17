import express from "express";
import cors from "cors";
import { env } from "@/config/env";
import routes from "@/routes";
import rateLimiter from "@/middleware/rateLimiter";
import errorHandler from "@/middleware/errorHandler";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import morgan from "morgan";

const PORT = env.PORT;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use("/api/v1", requireAuth(), rateLimiter, routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
