import * as cardService from "../services/cardService.js"

export async function payment(id:number, password:string, businessId:number, amount:number){
    const card = await cardService.getCardById(id);

    
}