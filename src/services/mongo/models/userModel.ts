import { timeStamp } from 'console';
import mongoose from 'mongoose'
import { Schema } from "mongoose";


const userSchema = () => {

    const userSchema = new Schema({
        uid: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        activeTasks: {
            type: [Schema.Types.ObjectId],
            ref: "task",
            default: [],
            required: false
        },
        finishedTasks: {
            type: [Schema.Types.ObjectId],
            ref: "task",
            default: [],
            required: false
        },
        groups: {
            type: [Schema.Types.ObjectId],
            ref: "group",
            default: [],
            required: true
        },
        userImg: {
            type: String,
            required: false,
        }
    })

    return userSchema
}

const userModel = mongoose.models.user || mongoose.model("user", userSchema())

export default userModel