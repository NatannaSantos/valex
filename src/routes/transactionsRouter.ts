import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";
import * as transactionsController from "../controllers/transactionsController.js";
import paymentSchema from "../schemas/paymentSchema.js";

const transactionRouter = Router();

transactionRouter.post("/cards/:id/recharge",validateSchemaMiddleware(rechargeCardSchema),transactionsController.rechargeCard);
transactionRouter.post("/cards/:id/payment",validateSchemaMiddleware(paymentSchema),transactionsController.payment);
transactionRouter.get("/cards/:id/transactions",transactionsController.getCardBalance);

export default transactionRouter;