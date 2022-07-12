import Joi from "joi";

const paymentSchema = Joi.object({
    password:Joi.string().required(),
    businessId:Joi.number().required(),
    amount:Joi.number().min(1).required()
});

export default paymentSchema;