import userModel from "../../models/userModel";

export const getUserInfoById = async (id: string) => {

    const userInfo = await userModel.findById(id).exec()
    return userInfo
}

export const getUserInfoByUid = async (id: string) => {

    const userInfo = await userModel.find({
        uid: id
    }).exec()
    return userInfo
}