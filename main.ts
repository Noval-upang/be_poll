import express from "express"
import route from "./src/router"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(route)

app.listen(3000, ()=>console.log("running"))