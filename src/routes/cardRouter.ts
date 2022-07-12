import { Router } from "express";
import * as cardController from "../controllers/cardController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import blockandunblockSchema from "../schemas/blockandunblockSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards",validateSchemaMiddleware(createCardSchema),cardController.createCard);
cardRouter.patch("/cards/:id/activate",validateSchemaMiddleware(activateCardSchema),cardController.activateCard);
cardRouter.patch("/cards/:id/blockcard",validateSchemaMiddleware(blockandunblockSchema),cardController.blockCard);
cardRouter.patch("/cards/:id/unblockcard",validateSchemaMiddleware(blockandunblockSchema),cardController.unBlockCard);

export default cardRouter;