import { Group, GroupAllowedUpdate } from "../../../../ts/group_type"
import groupModel from "../../models/groupModel"

export default async (group_id: string | string[], update: GroupAllowedUpdate) => {

    const group = await groupModel.findById(group_id).exec()
    let groupDoc: Group = group._doc

    if (group === null) {
        throw new Error(`group not found`)
    }
    try {
        await groupModel.findByIdAndUpdate(group_id, { ...groupDoc, ...update }).exec()
        return ({ ...groupDoc, ...update })

    } catch (err) {
        let message = 'unknow error, updateGroup'
        if (err instanceof Error) {
            message = err.message
        }
        throw new Error(message)
    }
}