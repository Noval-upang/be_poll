import express , { Router } from "express"
import GroupR from 'express-route-grouping';
import * as User from "./controllers/user"
import * as Middleware from "./controllers/middleware"
import * as Product from "./controllers/product"
import * as Company from "./controllers/company"
import * as Selling from "./controllers/selling"

const router = Router()

router.post("/login", User.login)
router.post("/register", User.register)

// auth route
router.use("/auth")
router.patch("/user", Middleware.auth)
router.patch("/role/:role", Middleware.role)

// product cont
router.get("/product_all", Product.getAll)
router.post("/product_add", Product.add)
router.get("/product/:id", Product.get)
router.delete("/product/:id/delete", Product.delet)

// company
router.get("/company_all", Company.all)
router.post("/company_add", Company.add)
router.delete("/company/:id/delete", Company.destroy)

// worker
router.get("selling_all", Selling.all)
router.post("selling_add", Selling.add)



export default router