import * as companyRepository from "../repositories/companyRepository.js";

export async function validateApiKey(apiKey:string){
    const existCompany = await companyRepository.findByApiKey(apiKey);
    if(!existCompany){
        throw { type: "unauthorized", message:"unregistered company"};
    }
}