import express from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "@/routes";

const PORT = env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
