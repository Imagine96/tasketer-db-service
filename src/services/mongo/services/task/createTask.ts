import taskModel from "../../models/taskModel";

export default async (taskName: string, group_id: string, open: boolean = true) => {
    try {
        const newTask = new taskModel({
            name: taskName,
            group: group_id,
            open: open
        })
        await newTask.save()
        return newTask
    } catch (err) {
        let message = 'unkown error, Create Task'
        if (err instanceof Error) {
            message = err.message
        }
        throw new Error(message)
    }
}