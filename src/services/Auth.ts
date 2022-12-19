import User from "../models/User";
import { Request, Response } from "express"
import { userExists, generateAuthToken, passwordIsCorrect, hashPassword, Logger } from "../utils"

//TODO: Return user information and token
export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (await userExists(email)) return res.status(409).send({ "message": "email already in use" })
        const newUser = new User({ email, password: hashPassword(password), plan:"basic" })
        newUser.save((err, result) => {
            if (err) {
                Logger("Failure", "A user failed to be registered")
                return res.status(500).send({ "message": `Something went wrong ${err.message}` })
            }
                      
            const token = generateAuthToken(email)
            Logger("success", "A user successfully registered")
            return res.status(200).send({
                "token": token,
                "user": {
                    "email": result.email,
                    "plan": result.plan
                }
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
            "token": generateAuthToken(email),
            "user":{
                "email": targettedUser.email,
                "plan": targettedUser.plan
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            "message":`${error}`
        })
    }
}

export async function loginWithToken( req: Request, res: Response ){
    try{
        const authHeader: string = req.headers.authorization as string
        if (!authHeader) {
            return res.status(401).send({
                 "message": "User not authenticated"
            })
        }
        const bearerToken = authHeader.split(" ")[1]
        
    }catch(err){
        console.log(err)
        return res.status(401).send({
            "message":"User not authenticated"
        })
    }
}
