import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { prisma } from "@/config/prisma";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.status(200).json({ message: "user created", user });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
