import { Router } from "express";
import { transactionController } from "@/controllers/transaction.controller";

const router = Router();

router.post("/", transactionController.create);
router.get("/", transactionController.fetchAll);
router.delete("/:id", transactionController.delete);

export { router as transactionRouter };
