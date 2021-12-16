import { getUserInfoById, getUserInfoByUid } from "./getUserInfo";
import updateUserInfo from "./updateUserInfo";
import createUserInfo from "./createUserInfo";

const userInfoServices = {
    getUsers: {
        getUserInfoById,
        getUserInfoByUid,
    },
    updateUser: updateUserInfo,
    createUser: createUserInfo
}

export default userInfoServices

