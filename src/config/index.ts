import * as dotenv from "dotenv"
dotenv.config()

export const DB_URL = process.env.DB_URL as string || "mongodb://127.0.0.1:27017/pigeoncms"

export const jwtKey = "pigeoncms007007"

export const saltRounds = 10

export const breh = "aight"