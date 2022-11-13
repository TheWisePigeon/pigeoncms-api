import mongoose from "mongoose";

const Entity = mongoose.model("entity", new mongoose.Schema({ container: String }, { strict: false }))

export default Entity 