import groupModel from "../models/groupModel"
import { Group } from "../../../ts/group_type"

export const addTaskToGroupTaskLog = async (group_id: string, task_id: string) => {

    const groupToUpdate: Group = await groupModel.findById(group_id).exec()
    const taskLogUpdate = groupToUpdate.taskLog

    if( taskLogUpdate.indexOf(task_id) === -1 ){
        taskLogUpdate.push(task_id)
        await groupModel.findByIdAndUpdate(group_id, {
            taskLog: taskLogUpdate
        }).exec()
    }
    else{
        throw new Error('task already in taskLog')
    }
}