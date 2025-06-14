import {
  createTransactionSchema,
  deleteTransactionSchema,
  getSummarySchema,
  getTransactionsSchema,
} from "@/schema";
import { z } from "zod";

export type CreateTransaction = z.infer<typeof createTransactionSchema>;

export type GetTransactions = z.infer<typeof getTransactionsSchema>;

export type DeleteTransaction = z.infer<typeof deleteTransactionSchema>;

export type GetSummary = z.infer<typeof getSummarySchema>;
