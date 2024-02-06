import {ValidationError, Result} from 'express-validator';

export function toObject(res:  Result<ValidationError>){
   return res.mapped()
}