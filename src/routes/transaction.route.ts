import { Router } from "express";
import { transactionController } from "@/controllers/transaction.controller";

const router = Router();

router.post("/", transactionController.create);
router.get("/", transactionController.getAll);
router.get("/summary", transactionController.getSummary);
router.delete("/:id", transactionController.delete);

export { router as transactionRouter };
