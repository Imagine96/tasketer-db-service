import { Group } from "../../../../../ts/group_type"
import groupModel from "../../models/groupModel"

export default async (group_id: string | string[], usersUpdate: string[]) => {

    const group = await groupModel.findById(group_id).exec()
    let groupDoc: Group = group._doc

    if (group === null) {
        throw new Error(`group ${group_id} not found`)
    }

    try{
        groupDoc = await groupModel.findByIdAndUpdate(group_id, {
            ...groupDoc,
            users: usersUpdate
        }).exec()
    }catch(err){
        let message = 'unknow error, could not update group'
        if(err instanceof Error){
            message = err.message
        }
        throw new Error(message)
    }

    return groupDoc
}