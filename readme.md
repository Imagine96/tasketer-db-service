# Tasketer dbservice

A simple tool implementation to controll tasks and workflows inside groups of users.

## What does it use?

- Mongoose
- Typescript

## Data structure

- user: 
    + uid: 
        Unique string ideally provided by an auth provider, required.
    + _id: 
        Provided by mongodb to every document, it is an unique string and we will reffer to it as just id.
    + username: 
        unique string, required.
    + activeTasks:
        Arrays of task`s ids that has this user as part of its directed array, tasks that has been assigned to this user
    + finishedTasks
        Arrays of finished task`s ids that has this user as part of its directed array and has been finished closed task that are finished also (closed task that werent finished before clousure will be cleaned from this array )
    + groups:
        Array of group's ids that has this user as part of its users array, required.
    + userImg:
        Url for user avatar

- Group
    + groupName:
        Unique string, required.
    + owner_id:
        Id of the user that create the group (once the group is created the owner will be added to the users array), required.
    + taskLog:
        Array of the group's active tasks.
    + finishedTaskLog
        Array of the group's finished task and closed and finished task (closed task that werent finished before clousure will be cleaned from this array )
    + users: 
        Array of users with acces to this groups and it's tasks.
    + closed:
        defines if the group has a logical deletion applied, default to false. 

- Task
    + group:
        Group to which the task belong's id, required.
    + name:
        string, task's names must be unique inside their groups, required.
    + shortDescription
    + description
    + open:
        boolean, defines if anyone in the group can join the task, default to true.
    + directed:
        Array of user's ids that have this task assigned.
    + finished:
        boolean, complition state of the task, default to false.
    + marks:
        array of strings with the diferent marks allowed for the task (important, bookmark etc...)
    + closed: 
         defines if the task has a logical deletion applied, default to false. 

## Usage

Once installed the package you can import the different functionalities by named import.

+ connect
+ disconnect
+ users
+ groups
+ tasks

To use any of the methods, an active connection to a mongodb instance is required, this will be skipped on the examples, just make shure you call the connect method before anything related with the tasketer service.

### To connect to your mongo db instance

connect and disconnect 

```
import { connect, disconnect } from "dbtasketer-service"

//your config fot the connection
const options = {}


try{
  await connect('Your mongo db instance url', options)
}catch(err){
  //handle error here
}

//connected to mongo db instance

//...

try{
  await disconnect()
}catch(err){
  //handle error here
}

//disconnected from mongo db instance

```
    
### users object

Start by importing the users object, getting acces to the createUser, updateUser methods and the getUser object.

- getUser has two methods, getUserById and getUserByUid, wich takes your db instance real document _id and the uid the user was created with respectively.

    Both returns the user info or throws an error.
    
    ```
    import { users } from 'dbtasketer-service'

    const mongoDocument_id = 'id example'
    const userUid = 'uid example'

    try{
        const myExistingUser = await users.getUsers.getUserInfoById(mongoDocument_id)
    }catch(err){
        //handles error
    }

    try{
        const myOtherExistingUser = await users.getUsers.getUserInfoByUid(userUid)
    }catch(err){
        //handles error
    }
    ```

- createUser takes an unique id (ideally provided by your auth provider) and username and creates and returns a new instance of the user model in your db on success or throws an error.
    ```
    import { users } from 'dbtasketer-service'
    
    const myUserName = 'Lonely Juan'
    const uidPlacheHolder = 'this string must be unique'
    
    try{
        const newUser = users.createUser(uidPlacheHolder, myUserName)
    }catch(err){
        //handle error
    }
    ```
    
- updateUser takes an existing user id and a data object (meant to be the update), recomended if using typescript to use the types provided  
    ```
    import {users} from 'dbtasketer-service/'
    import { UserTypes } from 'dbtasketer-service'

    const myExistingUserId = '<user id>'

    const updateExample : UserTypes.UserInfoAllowedUpdateFields = {
        username: 'my new username',
        userImg: 'my new url for the user avatar'
    }

    try{
        const updatedUser = await users.updateUser(myExistingUserId, updateExample )
    }catch(err){
        //handles error
    }
    ```

### group object

Start by importing the group object, getting acces to the createGroup, updateGroup, updateGroupUsers methods and the getGroup object.

To delete a group, use the updateGroup and set it in the update object the propertie closed to true, closed groups can no longer be modified or reopened.

- getGroup has these methods, getGroupById adn getGroupByOwnerId wich takes the id of the group and the id of the user owner of the group respectively.

    Returns the group or throws an error
    
    ```
    import { groups } from 'dbtasketer-service'

    const myGroupId = 'group id'
    const groupOwnerId = 'user id'

    try{
        const myGroup = await groups.getGroup.getGroupById(myGroupId)
        const alsoMyGroup = await groups.getGroup.getGroupByOwnerId(groupOwnerId)
    }catch(err){
        //handle error
    }
    ```
    
- createGroup takes a groupName (must be unique) and the id of the user that creates the group as the ownerId and return a new instance of the group model or throws an error.
    
    ```
    import { groups } from 'dbtasketer-service'

    const groupName = "pepe's team" 
    const ownerId = 'user id'

    try{
        const myNewGroup = await groups.createGroup(groupName, ownerId)
    }catch(err){
        //handle error
    }
    ```

- updateGroup takes an existing group id and an object type GroupAllowedUpdate and returns the updated group info or throws an error

    ```
    import { groups, GroupTypes } from 'dbtasketer-service'

    const updateExample : GroupTypes.GroupAllowedUpdate = {
        groupName: "pepe's super cool new name for the team"
    }

    const myGroupId = 'group id'

    try{
        const myUpdatedGroup = groups.updateGroup(myGroupId, updateExample)
    }catch(err){
        //handle error
    }
    ```

- updateGroupUsers takes an existing group id and an array with the updated users list and returns the updated group info or throws an error

    ```
    import { groups } from 'dbtasketer-service'

    const userListUpdated = [ 'pepe', 'pepefan#1', 'juan faction spy' ]
    const myGroupId  = 'group id'

    try{
        const myUpdatedGroup = groups.updateGroupUsers(myGroupId, userListUpdated)
    }catch(err){
        //handle error
    } 
    ```

### tasks object
    
Start by importing the tasks object, getting acces to the createTask, updateTask, updateTaskUsers, updateTaskState methods and the getTask object.

To delete a task, use the updateTaskState and set it in the update object the propertie closed to true, closed tasks can no longer be modified or reopened.

- getTask has these methods, getTaskById, getTaskByGroupId and getTaskByUserId wich takes the id of the task,the group wich contains the task, or an user that has the task assigned respectively.

    Returns the task or throws an error.   
    
    ```
    import { tasks } from 'dbtasketer-service'

    const taskId = 'my task id'
    const groupId = 'group id to which the task belongs'
    const userId = 'user id that has the task asigned'

    try{
        const task = await tasks.getTask.getTaskById(taskId)
        const sameTask = await tasks.getTask.getTaskByGroupId(groupId)
        const andYetAgain = await tasks.getTask.getTaskByUserId(userId)
    }catch(err){
        // handles error
    }
    ```
  
 - createTask takes a taskName (must be unique in every group) and the id of the group wich contains the task and return a new instance of the task model or throws an error.
  
    ```
    import { tasks } from 'dbtasketer-service'
    
    const newTaskName = 'unique name inside the group'
    const groupId = 'group id that is gonna own the task'
    
    const open = true 
    //if open is not provided it will be set to true by default

    try{
        const newTask = await tasks.createTask(newTaskName, groupId, open)
    }catch(err){
        //handles error
    }
    ```
    
- updateTask takes an existing task id and an object type TaskDefaultAllowedFields and returns the updated task info or throws an error.
    ```
    import { tasks, TaskTypes } from 'dbtasketer-service'

    const updateExample : TaskTypes.TaskDefaultAllowedFields = {
        name: 'the new name must be free',
        description: 'task description'
    } 

    const taskId = 'my task id'

    try{
        const updatedTask = await tasks.updateTask(taskId, updateExample)
    }catch(err){
        //handle error
    }
    ```
    
- updateTaskState takes an existing task id and an object type TaskStateUpdateAllowedFields and returns the updated task or throws an error.

    ```
    import { tasks, TaskTypes } from 'dbtasketer-service'

    const updateExample : TaskTypes.TaskStateUpdateAllowedFields = {
        open: false,
        finished: true,
        closed: true
    }

    const taskId = 'my task id'

    try{
        const updatedTask = await tasks.updateTaskState(taskId, updateExample)
    }catch(err){
        //handle error
    }
    ```
    
- updateTaskUsers takes an existing task id and an object type TaskStateUpdateAllowedFields and returns the updated task or throws an error.

    ```
    import { tasks, TaskTypes } from 'dbtasketer-service'

    const updateExample : TaskTypes.TaskUsersUpdateAllowedFields = ['pepefan#1', 'lonlely juan super spy']

    const taskId = 'my task id'

    try{
        const updatedTask = await tasks.updateTaskUsers(taskId, updateExample)
    }catch(err){
        //handle error
    }
    ```
    
## Utils

the package comes with a number of helper methods for different scenarios. 

   <img width="597" alt="Screenshot 2021-12-20 at 02 36 59" src="https://user-images.githubusercontent.com/81493770/146699916-8499c1b2-098f-463d-a98f-1a3741d6a192.png">
