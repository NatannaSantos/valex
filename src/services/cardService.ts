import * as cardRepository from "../repositories/cardRepository.js";
import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService.js";
import {faker} from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from 'cryptr';


export async function createCard(apiKey: string, employeeId:number, type: cardRepository.TransactionTypes){
    
    await companyService.validateApiKey(apiKey);
    
    const employee = await employeeService.getEmployeeById(employeeId);    
   
    const existCard = await cardRepository.findByTypeAndEmployeeId(type,employeeId);
    
    if (existCard) {
        throw { type: "conflict", message:"invalid employeeId or type"};
      }
      
    const cardData = generateCardData(employee.fullName);    

    await cardRepository.insert({
        ...cardData,
        employeeId,
        isVirtual:false,
        isBlocked:false,
        type,
    });    
}

function generateCardData(employeeName:string){
    const number = faker.finance.creditCardNumber("mastercard");
    const cardholderName = createCardName(employeeName);
    const expirationDate = dayjs().add(5, "year").format("MM/YY");
    const securityCode = generateSecurityCode();
   

    return {
        number,
        cardholderName,
        expirationDate,
        securityCode
    }        

    }

    function createCardName(fullName:string){
        const cardName = fullName.split(' ');
        const firstName = cardName.shift()+ ' ';
        const lastName= cardName.pop();
    
        const middleNames = cardName.filter((middleName)=>middleName.length>=3);
    
        let middleNameInitial = middleNames.map((initial)=>initial[0]).join(' ');
    
        if (middleNameInitial.length>0) middleNameInitial += ' ';
    
        const cardHolderName = `${firstName}${middleNameInitial}${lastName}`.toUpperCase();
    
        return cardHolderName;
    
    }

    function generateSecurityCode(){
        const securityCode = faker.finance.creditCardCVV();
        const cryptr = new Cryptr('myTotallySecretKey');
        const encryptedString = cryptr.encrypt(securityCode);
        
        return encryptedString;

    }

