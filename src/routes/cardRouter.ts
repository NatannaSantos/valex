import { Router } from "express";
import * as cardController from "../controllers/cardController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards",validateSchemaMiddleware(createCardSchema),cardController.createCard);

export default cardRouter;