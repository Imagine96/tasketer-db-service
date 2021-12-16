import taskModel from "../../models/taskModel"

export const getTaskById = async (task_id: string | string[]) => {
    const task = await taskModel.findById(task_id).exec()
    if (task === null) {
        throw new Error(`task ${task_id} not found`)
    } else {
        return task
    }
}

export const getTaskByGroupId =  async ( group_id: string) => {
    const tasks = await taskModel.find({
        group: group_id
    }).exec()
    return tasks
}

export const getTaskByUserId = async (user_id: string) => {
    const tasks = await taskModel.find({
        directed: [user_id]
    }).exec()
    return tasks
}
