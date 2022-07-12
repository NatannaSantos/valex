import * as cardRepository from "../repositories/cardRepository.js";
import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from 'cryptr';
import bcrypt from "bcrypt";


export async function createCard(apiKey: string, employeeId: number, type: cardRepository.TransactionTypes) {

    await companyService.validateApiKey(apiKey);

    const employee = await employeeService.getEmployeeById(employeeId);

    const existCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

    if (existCard) {
        throw { type: "conflict", message: "invalid employeeId or type" };
    }

    const cardData = generateCardData(employee.fullName);

    await cardRepository.insert({
        ...cardData,
        employeeId,
        isVirtual: false,
        isBlocked: false,
        type,
    });
}

function generateCardData(employeeName: string) {
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

function createCardName(fullName: string) {
    const cardName = fullName.split(' ');
    const firstName = cardName.shift() + ' ';
    const lastName = cardName.pop();

    const middleNames = cardName.filter((middleName) => middleName.length >= 3);

    let middleNameInitial = middleNames.map((initial) => initial[0]).join(' ');

    if (middleNameInitial.length > 0) middleNameInitial += ' ';

    const cardHolderName = `${firstName}${middleNameInitial}${lastName}`.toUpperCase();

    return cardHolderName;

}

function generateSecurityCode() {
    const securityCode = faker.finance.creditCardCVV();
    const cryptr = new Cryptr('myTotallySecretKey');
    const encryptedString = cryptr.encrypt(securityCode);

    console.log("security code", securityCode);

    return encryptedString;

}


export async function activateCard(id: number, cvc: string, password: string) {
    const card = await getCardById(id);
    console.log("card", card);
    validateExpirationDate(card.expirationDate);
    validateCVC(cvc, card.securityCode);

    const activeCard = card.password;

    if (activeCard) {
        throw { type: "bad_request", message: "Card is already active" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await cardRepository.update(id, { password: hashedPassword });

}

export async function getCardById(id: number) {
    const card = await cardRepository.findById(id);
    if (!card) {
        throw { type: "not_found", message: "no cards registered" };
    }
    return card;
}

export async function validateExpirationDate(expirationDate: string) {
    const today = dayjs().format("MM/YY");
    if (dayjs(today).isAfter(dayjs(expirationDate))) {
        throw { type: "bad_request", message: "expiration date card" };
    }
}

export function validateCVC(cvc: string, cardCVC: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    const decryptedString = cryptr.decrypt(cardCVC);

    console.log("descriptografado", decryptedString);
    console.log("cvc aqui", cvc);
    if (cvc !== decryptedString) {
        throw { type: "unauthorized", message: "invalid CVC" };
    }

}

export function validatePassword(password: string, cardPassword: string) {
    const isPasswordValid = bcrypt.compareSync(password, cardPassword);
    if (!isPasswordValid) {
        throw { type: "unauthorized", message:"password incorrect"};
    }
}

export async function findCardById(cardId: number) {

}







