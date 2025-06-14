import { z } from "zod";
import { ExpenseType } from "@/generated/prisma";

export const createTransactionSchema = z.object({
  userId: z.string().cuid("Invalid user ID"),
  amount: z.number().positive("Amount must be positive"),
  type: z.nativeEnum(ExpenseType),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
});

export const deleteTransactionSchema = z.object({
  id: z.string().cuid("Invalid transaction ID"),
});

export const getTransactionsSchema = z.object({
  userId: z.string().cuid("Invalid user ID"),
});

export const getSummarySchema = z.object({
  userId: z.string().cuid("Invalid user ID"),
});
