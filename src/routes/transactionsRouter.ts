import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";
import * as transactionsController from "../controllers/transactionsController.js";

const transactionRouter = Router();

transactionRouter.post("/cards/:id/recharge",validateSchemaMiddleware(rechargeCardSchema),transactionsController.rechargeCard);

export default transactionRouter;