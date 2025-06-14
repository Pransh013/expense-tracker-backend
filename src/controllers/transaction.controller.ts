import {
  createTransactionSchema,
  deleteTransactionSchema,
  getSummarySchema,
  getTransactionsSchema,
} from "@/schema";
import { transactionService } from "@/services/transaction.service";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "@/types";

export const transactionController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = createTransactionSchema.safeParse(
      req.body
    );

    if (!success) {
      return next({
        statusCode: 400,
        message: "Validation error",
        errors: error.flatten().fieldErrors,
      } as ErrorHandler);
    }

    try {
      const transaction = await transactionService.create(data);
      res.status(201).json({ message: "Transaction created", transaction });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = getTransactionsSchema.safeParse(req.query);
    if (!success) {
      return next({
        statusCode: 400,
        message: "Validation error",
        errors: error.flatten().fieldErrors,
      } as ErrorHandler);
    }

    try {
      const transactions = await transactionService.getAll(data);
      res.status(200).json({ transactions });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = deleteTransactionSchema.safeParse(
      req.params
    );

    if (!success) {
      return next({
        statusCode: 400,
        message: "Validation error",
        errors: error.flatten().fieldErrors,
      } as ErrorHandler);
    }

    try {
      await transactionService.delete(data);
      res.status(200).json({ message: "Transaction deleted" });
    } catch (err) {
      next(err);
    }
  },

  getSummary: async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = getSummarySchema.safeParse(req.query);
    if (!success) {
      return next({
        statusCode: 400,
        message: "Validation error",
        errors: error.flatten().fieldErrors,
      } as ErrorHandler);
    }

    try {
      const summary = await transactionService.getSummary(data);
      res.status(200).json({ summary });
    } catch (err) {
      next(err);
    }
  },
};
