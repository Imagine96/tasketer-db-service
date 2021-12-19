import { Group } from "../../../../../ts/group_type";

const onGroupPreUpdateValidations = (doc: Group) => {
    if(doc.closed){
        throw new Error('closed groups can not be updated')
    }
}

export default onGroupPreUpdateValidations