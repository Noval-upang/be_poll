import { NextFunction, Request, Response } from "express";
import { Constants, Func } from "./init";
import { Query, Select } from "../DB/func";
import { Company, User } from "../DB/type";

export async function auth(req:Request, res:Response) {
   const 
      auth = await Func.parseToken(req)  as User | undefined,
      user = await Select("user", `email = ${auth?.email}`)

   !user.result[0] ? 
      res.status(Constants.UNAUTH).end() :
      res.end()
}

export async function role(req:Request, res:Response) {
   const 
      auth = await Func.parseToken(req)  as User ,
      condition = req.params.role  === "admin" ?
         `id_user = ${auth.id}` : 
         `EXISTS (SELECT * FROM  
            worker 
            WHERE id_user = ${auth.id})`,
      qty = await Query<Company[]>(`SELECT * FROM company WHERE ${condition}`)
   
   qty.result.length > 0 ? res.end() : res.status(Constants.FORBIDEN).end()
}