import { Router } from "express";
import * as cardController from "../controllers/cardController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards",validateSchemaMiddleware(createCardSchema),cardController.createCard);
cardRouter.patch("/cards/:id/activate",validateSchemaMiddleware(activateCardSchema),cardController.activateCard);

export default cardRouter;