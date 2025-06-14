import { prisma } from "@/config/prisma";

export const transactionService = {
  create: async (data: {
    userId: string;
    amount: number;
    type: "EXPENSE" | "INCOME";
    category: string;
    description?: string;
    date?: Date;
  }) => {
    return prisma.expense.create({
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  },

  fetchAll: async (userId: string) => {
    return prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: { date: "desc" },
    });
  },

  delete: async (id: string) => {
    await prisma.expense.delete({ where: { id } });
    return true;
  },
};
