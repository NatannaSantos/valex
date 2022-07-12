import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";

export async function rechargeCard(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string;
    const {id} = req.params;
    const { amount } = req.body;
   console.log("cardId",id)
    if (!apiKey) {
        return res.status(401).send("Invalid API");
    }

    await rechargeService.rechargeCard(apiKey, Number(id), amount);

    res.sendStatus(201);

}