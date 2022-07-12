import * as businessRepository from "../repositories/businessRepository.js";

export async function getBusinessById(id: number) {
  const business = await businessRepository.findById(id);
  if (!business) {
    throw { type: "bad_request", message:"Business inexistent" };
  }

  return business;
}