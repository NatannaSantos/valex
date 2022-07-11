import {ObjectSchema} from "joi";
import {Request,Response,NextFunction} from "express";

export function validateSchemaMiddleware(schema:ObjectSchema){
    return(req:Request,res:Response,next:NextFunction) =>{
    const validation = schema.validate(req.body);
    console.log("requisição",req.body);
    if (validation.error) {
      return res.status(422).send(validation.error.message);
    }

    next();
    }    
}