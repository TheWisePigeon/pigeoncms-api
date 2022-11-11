import ContentContainer from "../models/ContentContainer";
import Entity from "../models/Entity";
import { Request, Response } from "express"

export async function createContainer(req: Request, res: Response) {
    try {
        const { name, decoded } = req.body
        const { email } = decoded
        const existingContainer = await ContentContainer.findOne({
            name, owner: email
        })
        if( existingContainer ) return res.status(409).send({ "message":"A container with the same name already exists" })
        const newContainer = new ContentContainer({
            name, owner: email
        })
        newContainer.save((err, result)=>{
            if(err){
                return res.status(500).send({
                    "message":`Something went wrong ${err.message}`
                })
            }
            return res.status(201).send({
                "data": result
            })
        })

    } catch (error) {
        return res.status(500).send({
            "message":error
        })
    }
}

export async function getContainer(req: Request, res: Response) {
    try {
        const { name } = req.query
        const { decoded } = req.body
        const { email } = decoded
        const targettedContainer = await ContentContainer.findOne({
             name, owner: email
        })
        if(! targettedContainer) return res.status(404).send({ "message":"Container not found" })
        const entities = await Entity.find({
            container: targettedContainer.id
        })
        return res.status(200).send({
            "data": entities
        })

    } catch (error) {
        return res.status(500).send({
            "message":`Something went wrong ${error}`
        })
    }
}

export async function getContainers(req: Request, res: Response) {
    try {
        const { decoded } = req.body
        const { email } = decoded
        const containers = await ContentContainer.find({
            owner: email
        })
        return res.status(200).send({
            "data": containers
        })
    } catch (error) {
        return res.status(500).send({
            "message":`Something went wrong ${error}`
        })
    }
}


export async function deleteContainer(req: Request, res: Response) {
    try {
        const { name } = req.query
        const { decoded } = req.body
        const { email } = decoded
        const targettedContainer = await ContentContainer.findOne({
            name, owner: email
        })
        if(! targettedContainer) return res.status(401).send({ "message":"Container not found" })
        await ContentContainer.deleteOne({
            name, owner: email
        })
        await Entity.deleteMany({
            container: targettedContainer.id
        })
        return res.status(200).send({ "message":"container and entities deleted" })
    } catch (error) {
        return res.status(500).send({
            "message":`Something went wrong ${error}`
        })
    }
}