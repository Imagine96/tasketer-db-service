import { Task, TaskDefaultAllowedFields } from "../../../../ts/task_type"
import taskModel from "../../models/taskModel"

export default async (task_id: string | string[], update: TaskDefaultAllowedFields,) => {

    const task = await taskModel.findById(task_id).exec()

    if (task === null) {
        throw new Error(`task not found`)
    }
    try {
        const updatedDoc: Task = {
            ...task._doc,
            ...update
        }
        const updatedTask: Task = await taskModel.findByIdAndUpdate(task_id, { ...update }).exec()
        return updatedDoc
    } catch (err) {
        let message = 'unkown error, updateTask DEFAULT option'
        if (err instanceof Error) {
            message = err.message
        }
        throw new Error(message)
    }
}


