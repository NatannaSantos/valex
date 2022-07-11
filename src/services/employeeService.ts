import * as employeeRepository from "../repositories/employeeRepository.js"

export async function getEmployeeById(employeeId:number) {
  const existEmployee = await employeeRepository.findById(employeeId);
  if (!existEmployee) {
    throw { type: "bad_request" };
  }

  return existEmployee;
}