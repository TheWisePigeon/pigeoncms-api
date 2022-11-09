import User from "../models/User";
import { Request, Response } from "express"
import { userExists, generateAuthToken, passwordIsCorrect, hashPassword } from "../utils"


export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (await userExists(email)) return res.status(409).send({ "message": "email already in use" })
        const newUser = new User({ email, password: hashPassword(password) })
        newUser.save((err, _result) => {
            if (err) {
                return res.status(500).send({ "message": `Something went wrong ${err.message}` })
            }
            const token = generateAuthToken(email)
            return res.status(200).send({
                "token": token
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            "message": `${error}`
        })
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const targettedUser = await User.findOne({ email })
        if( ! targettedUser ) return res.status(404).send({ "message":"User not found" })
        if( ! passwordIsCorrect( password, targettedUser.password as string) ) return res.status(400).send({ "message":"Wrong password" }) 
        return res.status(200).send({
            "token": generateAuthToken(email)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            "message":`${error}`
        })
    }
}
