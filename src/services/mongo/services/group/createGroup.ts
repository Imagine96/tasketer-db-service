import groupModel from "../../models/groupModel"
import { Group } from "../../../../ts/group_type"

export default async (groupName: string, owner_id: string) => {

    const existingGroup: Group | null = await groupModel.findOne({
        groupName: groupName
    }).exec()
    if (existingGroup) {
        throw new Error('groupName taken')
    } else {
        const newGroup = new groupModel({
            groupName: groupName,
            owner_id: owner_id
        })
        await newGroup.save()
        return newGroup
    }
}