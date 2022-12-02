import { Request, Response } from "express"
import Entity from "../models/Entity"
import ContentContainer from "../models/ContentContainer"

export async function getEntities(req: Request, res: Response) {
    try {
        const { decoded } = req.body
        const { container } = req.query
        const { email } = decoded
        const entities = await Entity.find({ owner: email, container })
        return res.status(200).send({
            "data": entities
        })
    } catch (error) {
        return res.status(500).send({
            "message":`Something went wrong ${error}`
        })
    }
}

export async function createEntity( req: Request, res: Response ){
    try {
        const { decoded, name, fields, container } = req.body
        const { email } = decoded
        if( await Entity.findOne({ name, owner: email, container }) ){
            return res.status(409).send({ "message":"An entity with that same name already exists" })
        }
        if( ! await ContentContainer.findOne({ name: container, owner: email }) ){
            return res.status(404).send({ "message":"Container not found" })
        } 
        const newEntity = new Entity({ name, fields, container, owner: email })
        newEntity.save((err, result)=>{
            if(err){
                return res.status(500).send({
                    "message":`Something went wrong ${err}`
                })
            }
            return res.status(201).send({
                "data": result
            })
        })
    } catch (error) {
        return res.status(500).send({
            "message":`Something went wrong ${error}`
        })
    }
}