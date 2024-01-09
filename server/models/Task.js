import mongoose from "mongoose";

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.model("Task", taskSchema);