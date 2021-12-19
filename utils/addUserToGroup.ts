import { Group } from "../../../ts/group_type";
import groupModel from "../models/groupModel";

export const addUserToGroup = async (_doc: any, user_id?: string) => {

    const doc : Group = _doc._doc

    if (!user_id) {
        if (doc.users.length === 0) {
            const groupUpdate: Group = {
                ...doc,
                users: [doc.owner_id]
            }
            try {
                const wtf = await groupModel.findByIdAndUpdate(doc._id, {
                    ...groupUpdate
                }).exec()

                console.log(groupUpdate)

            } catch (err) {
                console.log(err)
            }

        } else {
            throw new Error('user not provided exception')
        }
    } else {
        const usersUpdate: string[] = [...doc.users, user_id]
        try {
            await groupModel.findByIdAndUpdate(doc._id, {
                ...doc,
                users: usersUpdate
            })
        } catch (err) {
            throw new Error(`could not update the ${doc.groupName} group`)
        }
    }
}
