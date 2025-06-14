import { createTransactionSchema } from "@/schema";
import { transactionService } from "@/services/transaction.service";
import { Request, Response } from "express";

export const transactionController = {
  create: async (req: Request, res: Response) => {
    try {
      const { success, data, error } = createTransactionSchema.safeParse(
        req.body
      );

      if (!success) {
        res.status(400).json({ error: error.flatten() });
        return;
      }

      const transaction = await transactionService.create(data);
      res.status(201).json({ message: "Transaction created", transaction });
    } catch (error) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  fetchAll: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
      }
      const transactions = await transactionService.fetchAll(userId);
      res.status(200).json({ transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await transactionService.delete(id);
      if (!deleted) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }
      res.status(200).json({ message: "Transaction deleted" });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
