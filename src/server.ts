import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import auth from "./routes/auth"
import container from "./routes/container"
import types from "./routes/types"
import entity from "./routes/entity"
import { connectToDB } from "./utils"

const app = express()
app.use(cors())
app.use(bodyParser.json())

//SECTION Routes
app.use("/auth", auth) 
app.use("/container", container) 
app.use("/types", types)
app.use("/entity", entity)

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    connectToDB()
    console.log(`App listening on port ${PORT} `)
})