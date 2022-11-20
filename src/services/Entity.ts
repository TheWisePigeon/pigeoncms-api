import { Request, Response } from "express"
import Entity from "../models/Entity"
import ContentContainer from "../models/ContentContainer"
import mongoose from "mongoose"

export async function getEntities(req: Request, res: Response) {
    try {
        const { decoded } = req.body
        const { container } = req.query
        if( !mongoose.isValidObjectId(container) ){
            return res.status(400).send({
                "message":"Invalid container id"
            })
        }
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
        if( !mongoose.isValidObjectId(container) ){
            return res.status(400).send({ "message":"Invalid container id" })
        }
        if( ! await ContentContainer.findById(container) ){
            return res.status(404).send({ "message":"Container not found" })
        }
        const { email } = decoded
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