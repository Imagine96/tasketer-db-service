import createGroup from "./createGroup";
import { getGroupById, getGroupByOwnerId } from "./getGroup";
import updateGroup from "./updateGroup";
import updateGroupUsers from "./updateGroupUsers";

const groupServices = {
    getGroup: {
        getGroupById,
        getGroupByOwnerId
    },
    createGroup: createGroup,
    updateGroup: updateGroup,
    updateGroupUsers: updateGroupUsers
}

export default groupServices