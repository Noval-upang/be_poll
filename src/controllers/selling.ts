import { Request, Response } from "express";
import { Insert, Query } from "../DB/func";
import { Func } from "./init";
import { User } from "../DB/type";

export async function add(req:Request, res:Response) {
   await Insert("selling", req.body)   
   res.end()
}

export async function all(req:Request, res:Response) {
   const 
      user = await Func.parseToken(req) as User ,
      qry = await Query(`
         SELECT * FROM selling 
         WHERE EXISTS 
               (SELECT * FROM  
                  worker 
                  WHERE id_user = ${user.id})
               OR 
               (SELECT * FROM  
                  company 
                  WHERE id_user = ${user.id})`)
   res.json(qry.result)
}