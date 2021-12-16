import groupModel from "../../models/groupModel"

export const getGroupById = async (group_id: string | string[]) => {
    const group = await groupModel.findById(group_id).exec()
    return group
}

export const getGroupByOwnerId = async (owner_id: string) => {
    const groups = await groupModel.find({
        owner_id: owner_id
    }).exec()
    return groups
}
