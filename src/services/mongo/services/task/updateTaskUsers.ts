import { TaskUsersUpdateAllowedFields } from '../../../../ts/task_type'
import taskModel from '../../models/taskModel'

export default async (task_id: string | string[], update: TaskUsersUpdateAllowedFields) => {

    const task = await taskModel.findById(task_id).exec()

    if(task === null){
        throw new Error('invalid task')
    }else{
        try{
            const updatedTask = await taskModel.findByIdAndUpdate(task_id, {
                directed: update
            }).exec()
            return {...updatedTask._doc, directed: update}
        }catch(err){
            let message = 'unkown error, task could not be updated'
            if (err instanceof Error) {
                message = err.message
            }
            throw new Error(message)
        }
    }
}