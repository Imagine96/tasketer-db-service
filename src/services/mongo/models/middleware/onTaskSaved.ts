import { Task } from "../../../../ts/task_type"
import { addTaskToGroupTaskLog } from "../../../../utils/addTaskToGroupTaskLog"

const onTaskSaved = async (doc: Task) => {
    try{
        await addTaskToGroupTaskLog(doc.group, doc._id )  
    }catch(err){
        let message = 'unknow error, onTaskSaved'
        if(err instanceof Error){
            message = err.message
        }
        throw new Error(message)
    }
}

export default onTaskSaved