import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { jwtKey } from "../config"

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader: string = req.headers.authorization as string
        if (!authHeader) {
            return res.status(401).send({
                "message": "User not authenticated"
            })
        }
        const bearerToken = authHeader.split(" ")[1]
        try {
            const decoded = JSON.stringify(jwt.verify(bearerToken, jwtKey))
            req.body.decoded = JSON.parse(decoded)
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).send({
                "message":"Invalid authentication token"
            })
        }
    } catch (error) {
        return res.status(500).send({
            "message": error
        })
    }
}