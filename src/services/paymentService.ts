import * as cardService from "../services/cardService.js";
import * as businessService from "../services/businessService.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { sumTransactionWithAmount } from "./transactionService.js";

export async function payment(id: number, password: string, businessId: number, amount: number) {
    const card = await cardService.getCardById(id);

    if (!card.password) {
        throw { type: "unauthorized", message: "inative card" }
    }

    await cardService.validateExpirationDate(card.expirationDate);

    if (card.isBlocked === true) {
        throw { type: "unauthorized", message: "card is block" }
    }

    cardService.validatePassword(password, card.password);

    const business = await businessService.getBusinessById(businessId);

    if (card.type !== business.type) {
        throw { type: "bad_request", message: "the types differ" };
    }

    const payments = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);

    const cardAmount = getCardAmount(payments, recharges);

    if (cardAmount < amount) {
        throw { type: "bad_request", message:"insufficient funds" };
      }
    
      await paymentRepository.insert({ cardId: id, businessId, amount });  
}

function getCardAmount(
    payments: paymentRepository.PaymentWithBusinessName[],
    recharges: rechargeRepository.Recharge[]
) {
    const totalPaymentAmount = payments.reduce(sumTransactionWithAmount, 0);
    const totalRechargeAmount = recharges.reduce(sumTransactionWithAmount, 0);
    return totalRechargeAmount - totalPaymentAmount;
}