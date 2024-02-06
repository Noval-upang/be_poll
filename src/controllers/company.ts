import { Delete, Insert, Query, Select } from "../DB/func"
import { Request, Response } from "express"
import { Monad } from "../helper/Monad"
import { Constants, Func, Types } from "./init"
import * as validation from "../validation/func"
import { User } from "../DB/type"

export async function all(req:Request, res:Response) {

   const 
      user = await Func.parseToken(req) as User,
      qty  = await Query(`
         SELECT * FROM company 
            WHERE 
               id_user = ${user.id} 
               OR EXISTS 
               (SELECT * FROM  
                  worker 
                  WHERE id_user = ${user.id})
               `)
   res.json(qty.result)
}

export function add(req:Request, res:Response) {
   Monad<Request, Types.UnValid>(req)
      .binding(Func.validation)
      .success(async ()=>{
         const token = await Func.parseToken(req) as User
         await Insert("company", [{...req.body, id_number:token.id}])
         res.end()
      })
      .failed((r)=>
         res
            .status(Constants.FORBIDEN)
            .json(validation.toObject(r))
      )
}

export async function destroy(req:Request, res:Response) {
   const idCompany = req.query.id
   // delete company and worker
   await Delete("company", `id = ${idCompany}`)
   await Delete("worker", `id_company = ${idCompany}`)

   // delete selling then product
   // because selling.id_product is relate to product.id
   await Query(`
      DELETE FROM selling 
         WHERE EXISTS 
         (SELECT * FROM product WHERE product.id_company = ${idCompany})`)
   await Delete("product", `id_company = ${idCompany}`)
   res.end()
}

