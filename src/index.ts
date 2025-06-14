import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { prisma } from "@/config/prisma";
import { env } from "./config/env";

const PORT = env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.status(200).json({ message: "user created", user });
});

app.post("/api/v1/transactions", async (req: Request, res: Response) => {
  const { userId, amount, type, category, description, date } = req.body;

  const expense = await prisma.expense.create({
    data: {
      amount,
      category,
      type,
      date: date ? new Date(date) : undefined,
      description,
      userId,
    },
  });
  res.status(201).json({ message: "Transaction created", expense });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
