import db from './services/mongo/dbConnection'
import userInfoServices  from './services/mongo/services/user'
import taskServices from './services/mongo/services/task'
import groupServices from './services/mongo/services/group'

export const {connect, disconnect} = db
export const users = userInfoServices
export const tasks = taskServices
export const groups = groupServices




