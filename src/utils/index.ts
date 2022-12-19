import * as jwt from "jsonwebtoken"
import User from "../models/User"
import { DB_URL, jwtKey, saltRounds } from "../config"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { log } from "console"


export async function userExists(email: string) {
    return (await User.findOne({
        email
    }) != null)
}

export function generateAuthToken(email: string) {
   return jwt.sign({ email }, jwtKey)
}
 
export function verifyAuthToken(token: string) {
    try {
        return JSON.stringify(jwt.verify(token, jwtKey))
    } catch (error) {
        return false
    }
}

export function hashPassword(plainTextPassword: string) {
    return bcrypt.hashSync(plainTextPassword, saltRounds)
}

export function passwordIsCorrect(plainTextPassword: string, hash: string) {
    return bcrypt.compareSync(plainTextPassword, hash)
}

export function connectToDB() {
    try {
        mongoose.connect(
            DB_URL
        )
        console.log("Connected to database")
    } catch (error) {
        console.log(`Connection to database failed ${error}`)
        return
    }
}

//Add log type and specific color for each type
export function Logger(status:String, message: String ){
    log(`${status}: ${message}`)    
}
