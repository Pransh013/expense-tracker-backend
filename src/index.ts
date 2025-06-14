import express from "express";
import cors from "cors";
import { env } from "@/config/env";
import routes from "@/routes";
import rateLimiter from "@/middleware/rateLimiter";

const PORT = env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", rateLimiter, routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
