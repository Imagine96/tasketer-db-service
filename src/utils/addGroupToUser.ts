import { UserInfo } from "../ts/userInfo_type"
import userModel from "../services/mongo/models/userModel"

export const addGroupToUser = async (user_id: string, groupId: string) => {

    const userToUpdate: UserInfo = await userModel.findById(user_id).exec()

    const groupsUpdate: string[] = userToUpdate?.groups || []

    if (groupsUpdate.indexOf(groupId) === -1) {
        groupsUpdate.push(groupId)
        await userModel.findByIdAndUpdate(user_id, {
            groups: groupsUpdate
        }).exec()
    }
}