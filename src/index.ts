import db from './services/mongo/dbConnection'
import userInfoServices  from './services/mongo/services/user'
import taskServices from './services/mongo/services/task'
import groupServices from './services/mongo/services/group'
import { addGroupToUser } from './utils/addGroupToUser'
import { addTaskToGroupTaskLog } from './utils/addTaskToGroupTaskLog'
import { addTaskToUser } from './utils/addTaskToUser'
import { addUserToGroup } from './utils/addUserToGroup'
import { removeTaskFromUser } from './utils/removeTaskFromUser'

export const {connect, disconnect} = db
export const users = userInfoServices
export const tasks = taskServices
export const groups = groupServices

export * as UserTypes from './ts/userInfo_type'
export * as TaskTypes from './ts/task_type'
export * as GroupTypes from './ts/group_type'

export const utils = {
    addGroupToUser,
    addTaskToGroupTaskLog,
    addTaskToUser,
    addUserToGroup,
    removeTaskFromUser
}




