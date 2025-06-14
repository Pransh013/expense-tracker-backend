import { prisma } from "@/config/prisma";
import {
  CreateTransaction,
  DeleteTransaction,
  GetSummary,
  GetTransactions,
} from "@/types";

export const transactionService = {
  create: async (data: CreateTransaction) => {
    return prisma.expense.create({
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  },

  getAll: async ({ userId }: GetTransactions) => {
    return prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: { date: "desc" },
    });
  },

  delete: async ({ id }: DeleteTransaction) => {
    await prisma.expense.delete({ where: { id } });
    return true;
  },

  getSummary: async ({ userId }: GetSummary) => {
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
  },
};
