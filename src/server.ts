import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import auth_v1 from "./routes/v1/auth"
import container_v1 from "./routes/v1/container"
import entity_v1 from "./routes/v1/entity"
import { connectToDB } from "./utils"

const app = express()
app.use(cors())
app.use(bodyParser.json())

//SECTION Routes
app.use("/v1/auth", auth_v1) 
app.use("/v1/container", container_v1) 
app.use("/v1/entity", entity_v1)

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    connectToDB()
    console.log(`App listening on port ${PORT} `)
})