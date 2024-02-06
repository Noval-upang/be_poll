import { Request, Response } from "express";
import { Func } from "./init";
import * as validation from "../validation/func";
import { Delete, Insert, Select } from "../DB/func";
import { Monad } from "../helper/Monad";
import { Result, ValidationError } from "express-validator";

export async function add(req:Request, res:Response) {
   Monad<Request, Result<ValidationError>>(req)
      .binding(Func.validation)
      .success(async ()=>{
         await Insert("product", req.body)
         res.end()
      })
      .failed(
         (v)=>res.json(validation.toObject(v))
      )
}

export async function delet(req:Request, res:Response) {
   await Delete("product", `id = ${req.params.id}`)
   return res.end()
}

export async function get(req:Request, res:Response) {
   const query = await Select(
      "product", 
      `id = ${req.params.id}`
   )

   res.json(query.result[0])
}

export async function getAll(req:Request, res:Response) {
   const query = await Select(
      "product", 
      `id_company = ${req.body.id}`
   )

   res.json(query.result)
}

