import { Router } from "express";
import { transactionRouter } from "./transaction.route";

const router = Router();

router.use("/transactions", transactionRouter);

export default router;
