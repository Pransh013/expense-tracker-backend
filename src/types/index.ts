import { z } from "zod";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getSummarySchema,
  getTransactionsSchema,
} from "@/schema";

export type CreateTransaction = z.infer<typeof createTransactionSchema>;

export type GetTransactions = z.infer<typeof getTransactionsSchema>;

export type DeleteTransaction = z.infer<typeof deleteTransactionSchema>;

export type GetSummary = z.infer<typeof getSummarySchema>;

export type ErrorHandler = {
  statusCode?: number;
  message?: string;
  errors?: Record<string, string[]> | string;
};
