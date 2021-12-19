import { TaskStateUpdateAllowedFields } from '../../../../../ts/task_type'
import taskModel from '../../models/taskModel'


export default async (task_id: string | string[], update: TaskStateUpdateAllowedFields) => {

    const task = await taskModel.findById(task_id).exec()
    console.log(task)
    if(task === null){
        throw new Error ('invalid task')
    }else if(update.closed === update.finished === update.open === undefined){
        throw new Error ('invalid update')
    }else{
        const validUpdate = setUpdateData(update)
        try {
            const updatedTask = await taskModel.findByIdAndUpdate(task_id, validUpdate ).exec()
            return {...updatedTask._doc, ...validUpdate}
        } catch (err) {
            let message = 'unkown error, updateTask status'
            if (err instanceof Error) {
                message = err.message
            }
            throw new Error(message)
        }
    }
}

const setUpdateData = (update: TaskStateUpdateAllowedFields) => {

    const validUpdate : TaskStateUpdateAllowedFields = {}

    if(update.closed !== undefined){
        validUpdate.closed = update.closed
    }else if(update.finished !== undefined ){
        validUpdate.finished = update.finished
    }else if(update.open !== undefined){
        validUpdate.open = update.open
    }
    return validUpdate
}