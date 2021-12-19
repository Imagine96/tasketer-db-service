import { UserInfo, UserInfoAllowedUpdateFields } from "../../../../../ts/userInfo_type"
import userModel from "../../models/userModel"

export default async (user_id: string | string[], data: any) => {
    
    const userInfo: UserInfo = await userModel.findById(user_id).exec() 
    console.log(data)

    try{
        if(userInfo === null){
            throw new Error (`user ${user_id} not found`)
        }
        const update : UserInfoAllowedUpdateFields = data
        const updatedUserInfo = await userModel.findByIdAndUpdate(user_id, update).exec()
        return updatedUserInfo
        
    }catch(err){
        let message = 'unknowError, updateUserInfo'
        if(err instanceof Error){
            message = err.message
        }
        throw new Error(message)
    }
}