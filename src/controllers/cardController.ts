import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string;

    if (!apiKey) {
        return res.status(401).send("Invalid API");
    }


    const { employeeId, type } = req.body;
    console.log("employeeId", employeeId);
    await cardService.createCard(apiKey, employeeId, type);
    res.status(201);
}

export async function activateCard(req: Request, res: Response) {
    const { id } = req.params;
    const { cvc, password } = req.body;

    await cardService.activateCard(Number(id), cvc, password);

    res.status(200);
}

export async function blockCard(req: Request, res: Response) {
    const {id} = req.params;
    const {password} = req.body;

    await cardService.blockCard(Number(id),password);

    res.status(200);
}

export async function unBlockCard(req: Request, res: Response) {
    const {id} = req.params;
    const {password} = req.body;

    await cardService.unBlockCard(Number(id),password);

    res.status(200);
}

