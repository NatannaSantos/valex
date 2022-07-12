import Joi from "joi";

const activateCardSchema = Joi.object({
    cvc: Joi.string().pattern(/^[0-9]{3}$/).required(),
    password: Joi.string().pattern(/^[0-9]{4}$/).required()
})

export default activateCardSchema;