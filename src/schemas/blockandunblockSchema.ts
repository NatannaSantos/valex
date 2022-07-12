import Joi from "joi";

const blockandunblockSchema = Joi.object({
    password:Joi.string().required()
})

export default blockandunblockSchema;