import { prisma } from "@/config/prisma";
import { Expense } from "@/generated/prisma";
import {
  CreateTransaction,
  DeleteTransaction,
  ErrorHandler,
  GetSummary,
  GetTransactions,
} from "@/types";

export const transactionService = {
  create: async (
    data: CreateTransaction & { userId: string }
  ): Promise<Expense> => {
    try {
      return await prisma.expense.create({
        data: {
          ...data,
          date: data.date ? new Date(data.date) : undefined,
        },
      });
    } catch (error) {
      throw {
        statusCode: 500,
        message: "Failed to create transaction",
      } as ErrorHandler;
    }
  },

  getAll: async ({ userId }: GetTransactions): Promise<Expense[]> => {
    try {
      return await prisma.expense.findMany({
        where: {
          userId,
        },
        orderBy: { date: "desc" },
      });
    } catch (error) {
      throw {
        statusCode: 500,
        message: "Failed to fetch transactions",
      } as ErrorHandler;
    }
  },

  delete: async ({ id }: DeleteTransaction) => {
    try {
      await prisma.expense.delete({ where: { id } });
      return true;
    } catch (error) {
      throw {
        statusCode: 404,
        message: "Transaction not found",
      } as ErrorHandler;
    }
  },

  getSummary: async ({ userId }: GetSummary) => {
    try {
      const income = await prisma.expense.aggregate({
        where: { userId, type: "INCOME" },
        _sum: { amount: true },
      });

      const expense = await prisma.expense.aggregate({
        where: { userId, type: "EXPENSE" },
        _sum: { amount: true },
      });

      const totalIncome = income._sum.amount ?? 0;
      const totalExpense = expense._sum.amount ?? 0;

      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      };
    } catch (error) {
      throw {
        statusCode: 500,
        message: "Failed to get summary",
      } as ErrorHandler;
    }
  },
};
