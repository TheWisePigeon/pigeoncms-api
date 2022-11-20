import mongoose from "mongoose";

interface IField{
    name: string
    type: string
}

const entitySchema = new mongoose.Schema({
    name: String,
    fields: Array<IField>,
    container: String,
    owner: String
})

const Entity = mongoose.model("entity", entitySchema)

export default Entity 