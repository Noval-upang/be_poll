import { Request } from "express"
import { Result, ValidationError, validationResult } from "express-validator"
import { Status } from '../helper/Monad';
import jwt from 'jsonwebtoken';
import { User } from "../DB/type";

export namespace Constants {
   export const 
      UNAUTH = 401,
      BADREQ = 503,
      FORBIDEN = 3
}

export namespace Func {
   export  function validation(req:Request) : Status<Request, Types.UnValid>{
      const result =  validationResult(req)
      return !result.isEmpty() ? {ok:false, value: result} : {ok:true, value: req} 
   }

   export function parseToken(req:Request) {
      return new Promise((res)=>{
         const 
            token = req.headers["authorization"] || "",
            parser = process.env.JWT_PARSER!

         // check if token have parser
         if (token.includes(parser)) return res({})
         
         const jwtToken = token.split(parser).at(-1)![0]
         jwt.
            verify(
               jwtToken, 
               process.env.JWT_KEY!,
               (err, user)=>res(err ? {} : user)
            )
      })
   }

   export function createToken(user:User) {
      return jwt.sign(user, process.env.JWT_KEY!, {expiresIn:"24h"})
   }
}

export namespace Types {
   export type UnValid = Result<ValidationError>
}