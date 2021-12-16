import { Schema } from "mongoose";
import mongoose from "mongoose";
import onGroupSaved from "./middleware/onGroupSaved";
import onGroupPreUpdateValidation from "./middleware/onGroupPreUpdateValidation";

const groupSchema = () => {

    const groupSchema = new Schema({
        groupName: {
            type: String,
            unique: true,
            required: true
        },
        owner_id: {
            type: String,
            required: true
        },
        taskLog: {
            type: [Schema.Types.ObjectId],
            ref: "task",
            default: []
        },
        finishedTaskLog: {
            type: [Schema.Types.ObjectId],
            ref: "task",
            default: []
        },
        users: {
            type: [Schema.Types.ObjectId],
            default: [],
            ref: "user"
        },
        closed: {
            type: Boolean,
            default: false,
            required: true
        }
    }, { timestamps: true })

    groupSchema.pre('findOneAndUpdate', function (next) {
        if (this !== undefined) {
            this.model.findOne(this.getQuery())
                .then(doc => {
                    try {
                        onGroupPreUpdateValidation(doc)
                        next()
                    } catch (err) {
                        let message = 'unknow error, findOneAndUpdate middleware, pre, group'
                        if (err instanceof Error) {
                            message = err.message
                        }
                        console.log(err)
                        next(new Error(message))
                    }
                })
        }
    })

    groupSchema.post('save', function (doc, next) {
        onGroupSaved(doc)
        next()
    })

    return groupSchema
}

const groupModel = mongoose.models?.group || mongoose.model('group', groupSchema())

export default groupModel

