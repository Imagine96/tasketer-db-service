import userModel from "../models/userModel";
import { UserInfo } from "../../../ts/userInfo_type";

export const addTaskToUser = async ( task_id: string, user_id: string) => {

    const user: UserInfo = await userModel.findById(user_id).exec()

    if(user === null){
        throw new Error(`user ${user_id} not found`)
    }

    const activeTasks = user.activeTasks

    if(activeTasks?.indexOf(task_id)){
        throw new Error(`task ${task_id} already in activeTasks for user ${user_id}`)
    }

    const finishedTask = user.finishedTask

    if(finishedTask?.indexOf(task_id)){
        throw new Error(`task ${task_id} already in finishedTasks for user ${user_id}`)
    }

    const activeTasksUpdate = activeTasks ? [...activeTasks, task_id] : [task_id] 

     await userModel.findByIdAndUpdate({
        activeTasks: activeTasksUpdate
    }).exec()
}