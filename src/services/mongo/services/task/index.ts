import createTask from "./createTask";
import { getTaskById, getTaskByGroupId, getTaskByUserId } from "./getTask";
import updateTask from "./updateTask";
import updateTaskState from "./updateTaskState";
import updateTaskUsers from "./updateTaskUsers";

const taskServices = {
    getTask: {
        getTaskById,
        getTaskByGroupId,
        getTaskByUserId
    },
    createTask: createTask,
    updateTask: updateTask,
    updateTaskState: updateTaskState,
    updateTaskUsers: updateTaskUsers,
}

export default taskServices