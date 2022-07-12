import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as businessesRepository from "../repositories/businessRepository.js";
import { getCardAmount } from "./paymentService.js";

export function sumTransactionWithAmount(amount: number, transaction) {
    return amount + transaction.amount;
  }

export async function getBalance(id:number){
    const transactions = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);    
    
    //const businesses = await businessesRepository.findById();

    const balance = getCardAmount(transactions, recharges);
    
    return {
      balance,
      transactions,
      recharges
    } 
}