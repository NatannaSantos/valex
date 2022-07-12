import { Router } from "express";
import cardRouter from "./cardRouter.js";
import transactionRouter from "./transactionsRouter.js";

const router = Router();

router.use(cardRouter);
router.use(transactionRouter);

export default router;