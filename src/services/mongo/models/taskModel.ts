import { Schema } from "mongoose";
import mongoose from 'mongoose'
import onTaskSaved from "./middleware/onTaskSaved";
import onTaskPreUpdated from "./middleware/onTaskPreUpdated";

const taskSchema = () => {
    const taskSchema = new Schema({
        group: {
            type: Schema.Types.ObjectId,
            ref: "group",
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        open: {
            type: Boolean,
            required: true,
            default: true
        },
        directed: {
            type: [Schema.Types.ObjectId],
            ref: "user",
            required: false
        },
        finished: {
            type: Boolean,
            required: true,
            default: false,
        },
        marks: {
            type: Array<null | 'bookmark' | 'star'>(),
            default: [],
            required: false
        },
        closed: {
            type: Boolean,
            default: false,
            required: true
        }
    }, { timestamps: true })

    taskSchema.pre('findOneAndUpdate', function (next) {
        if (this !== undefined) {
            this.model.findOne(this.getQuery())
                .then(doc => {
                    try {
                        onTaskPreUpdated(doc)
                        next()
                    } catch (err) {
                        let message = 'unknow error, findOneAndUpdate middleware, pre, task'
                        if (err instanceof Error) {
                            message = err.message
                        }
                        next(new Error(message))
                    }
                })
        }
    })

    taskSchema.post('save', function (doc, next) {
        try {
            onTaskSaved(doc)
            next()
        } catch (err) {
            let message = 'unknow error, save middleware, post, task'
            if (err instanceof Error) {
                message = err.message
            }
            next(new Error(message))
        }
    })

    taskSchema.index({
        group: 1,
        name: 1
    }, { unique: true });

    return taskSchema
}

const taskModel = mongoose.models.task || mongoose.model('task', taskSchema())

export default taskModel