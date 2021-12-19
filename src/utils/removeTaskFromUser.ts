import { Task } from "../ts/task_type"
import { UserInfo } from "../ts/userInfo_type"

export const removeTaskFromUser = (user: UserInfo, taskToRemove: Task) => {

    if (taskToRemove.finished && user.activeTasks?.indexOf(taskToRemove._id)) {

        const taskIndex = user.activeTasks.indexOf(taskToRemove._id)

        const finishedTaskUpdate = user.finishedTask ? user.finishedTask : []
        finishedTaskUpdate.push(taskToRemove._id)

        let activeTaskUpdate : string[]

        if(user.activeTasks.length === 1){
            activeTaskUpdate = []
        }else{
            activeTaskUpdate = user.activeTasks
            activeTaskUpdate.splice(taskIndex, 1)
        }
        
        const userUpdated: UserInfo = {
            ...user,
            activeTasks: activeTaskUpdate,
            finishedTask: finishedTaskUpdate
        }

        return userUpdated
    }
    else{
        throw new Error(`userInfo for user ${user._id} does not have the ${taskToRemove._id} Task`)
    }
}