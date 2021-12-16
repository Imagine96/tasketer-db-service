import userModel from "../../models/userModel";

export default async (userUid: string, username: string) => {
    let userInfo = await userModel.findOne({ uid: userUid }).exec()
    if (userInfo === null) {
        const newUser = new userModel({
            uid: userUid,
            username: username
        })
        await newUser.save()
        userInfo = newUser
    } else {
        throw new Error(`Could not create user`)
    }
    return userInfo
}
