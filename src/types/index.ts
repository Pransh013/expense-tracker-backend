import { z } from "zod";
import { createTransactionSchema, deleteTransactionSchema } from "@/schema";

export type CreateTransaction = z.infer<typeof createTransactionSchema>;

export type DeleteTransaction = z.infer<typeof deleteTransactionSchema>;

export type GetTransactions = { userId: string };

export type GetSummary = { userId: string };

export type ErrorHandler = {
  statusCode?: number;
  message?: string;
  errors?: Record<string, string[]> | string;
};
