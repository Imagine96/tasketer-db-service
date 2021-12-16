import { Group } from "../../../../ts/group_type"
import { addGroupToUser } from "../../utils/addGroupToUser"
import { addUserToGroup } from "../../utils/addUserToGroup"
import userModel from "../userModel"

const onGroupSaved = async (doc: Group ) => {

    const users: string[] = doc.users
    if (users.length === 0) {
        await addUserToGroup(doc)
        const userDoc = await userModel.findById(doc.owner_id).exec()
        await addGroupToUser(userDoc._id, doc._id)
    } else {
        users.forEach( async (user) => {
            try {
               await addGroupToUser(user, doc._id)
            } catch (err) {
                console.error(err)
            }
        });
    }
}

export default onGroupSaved