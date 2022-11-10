import mongoose from "mongoose";

const containerSchema = new mongoose.Schema({
    name: String,
    owner: String
})

const ContentContainer = mongoose.model("ContentContainer", containerSchema)

export default ContentContainer