import { Request, Response } from "express";
import { Insert, Select } from "../DB/func";
import { User } from "../DB/type";
import bcrypt from 'bcrypt';
import { Constants } from "./init";
import {  validationResult } from 'express-validator';
import { toObject } from "../validation/func";

export async function login(req:Request, res:Response) {
   const user =  (await Select<User>("user", `email = ${req.body.email}`)).result[0]
   if (
      !user.email || 
      !(await bcrypt.compare(req.body.password, user.password))
   ) 
      return res.status(Constants.UNAUTH).send("Email or Password wrong")
   return res.end()
}

export async function register(req:Request, res:Response) {
   const validation = validationResult(req)
   if (!validation.isEmpty()) return res.status(Constants.FORBIDEN).json(toObject(validation))

   const 
      salt = await bcrypt.genSalt(10),
      newPass = await bcrypt.hash(req.body.password, salt)
   
   await Insert("user", [{email:req.body.email, password:newPass}])
   return res.end()
}