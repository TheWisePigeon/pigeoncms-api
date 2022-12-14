import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import auth from "./routes/v1/auth"
import container from "./routes/v1/container"
import entity from "./routes/v1/entity"
import { connectToDB } from "./utils"

const app = express()
app.use(cors())
app.use(bodyParser.json())

//SECTION Routes
app.use("/auth", auth) 
app.use("/container", container) 
app.use("/entity", entity)

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    connectToDB()
    console.log(`App listening on port ${PORT} `)
})