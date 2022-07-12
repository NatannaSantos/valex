import * as companyService from "../services/companyService.js";
import * as cardService from "../services/cardService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function rechargeCard(apiKey:string, cardId:number, amount:number){
    
    await companyService.validateApiKey(apiKey);
    
    const card = await cardService.getCardById(cardId);

    if (!card.password) {
        throw { type: "unauthorized", message: "inative card" }
    }

    cardService.validateExpirationDate(card.expirationDate);
    
    await rechargeRepository.insert({cardId,amount});    
}