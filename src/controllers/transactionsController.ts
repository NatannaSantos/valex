import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";
import * as paymentService from "../services/paymentService.js";
import * as transactionService from "../services/transactionService.js";

export async function rechargeCard(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string;
    const {id} = req.params;
    const { amount } = req.body;
   
    if (!apiKey) {
        return res.status(401).send("Invalid API");
    }

    await rechargeService.rechargeCard(apiKey, Number(id), amount);

    res.status(201).send("sucess");;

}

export async function payment(req:Request,res:Response){
    const {id} = req.params;
    const {password,businessId,amount}= req.body;

    await paymentService.payment(Number(id),password,businessId,amount);

    res.status(201).send("sucess");;

}

export async function getCardBalance(req: Request, res: Response) {
    const { id } = req.params;
        
    const cardBalance = await transactionService.getBalance(Number(id));
    console.log(cardBalance);

    res.status(200).send({cardBalance});
  
}