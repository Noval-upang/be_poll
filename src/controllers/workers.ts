import { Request, Response } from "express";
import { Delete, Insert, Query, Select } from "../DB/func";
import { Company, User } from "../DB/type";
import bcrypt from 'bcrypt';
import { Constants, Func } from "./init";

export async function add(req:Request, res:Response) {
   // validation
   const company = (await Select<Company>("company", `name = ${req.body.name}`)).result[0]
   if (
      !company || 
      await bcrypt.compare(
         req.body.codeAccess,
          company.codeAccess)
   ) return res.status(Constants.FORBIDEN).send("Code access wrong")


   // insert 
   await Insert("worker", [{...req.body, id_company:company.id}])
   res.end()
}

export async function exit(req:Request, res:Response) {
   const token = await Func.parseToken(req.cookies.token) as User
   await Delete("worker", `id_worker = ${token.id}`)
   res.end()
}

