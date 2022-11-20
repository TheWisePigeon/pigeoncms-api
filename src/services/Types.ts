import { Request, Response } from "express"

interface IType {
    name: string
    description: string
    example: string
}

const Types: Array<IType> = [
    {
        name:"Text",
        description:"Will contain textual values",
        example:"Some text"
    },
    {
        name:"Number",
        description:"Will contain numerical values",
        example:"15"
    },
    {
        name:"List",
        description:"Will contain a list of values",
        example:"['Paris', 14]"
    },
    {
        name:"List<Text>",
        description:"Will contain a list of textual values",
        example:"['Paris', 'London']"
    },
    {
        name:"List<Number>",
        description:"Will contain a list of numerical values",
        example:"[12, 30.5]"
    }
]

export function getTypes( _req: Request, res: Response ){
    try {
        return res.status(200).send({
            "data": Types
        })
    } catch (error) {
        return res.status(500).send({
            "message":`Something went wrong ${error}`
        })
    }
}