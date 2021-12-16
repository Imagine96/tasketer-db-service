import { Task } from "../../../../ts/task_type";

export default (doc: Task) => {
    if(doc.closed){
        throw new Error('closed tasks can not be updated')
    }
}