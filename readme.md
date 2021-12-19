# Tasketer dbservice

A simple tool implementation to controll tasks and workflows inside groups of users.

## What does it use?

- Mongoose
- Typescript

## Usage

Once installed the package you can import the different functionalities by named import.

+ connect
+ disconnect
+ users
+ groups
+ tasks

To use any of the methods, an active connection to a mongodb instance is required, this will be skipped on the examples, just make shure you call the connect method before anything related with the tasketer service.

### For connect to your mongo db instance

connect and disconnect 

<img width="469" alt="connect and disconnect example" src="https://user-images.githubusercontent.com/81493770/146683285-de21b332-2d4f-4431-b66c-a0824ad573a6.png">
    
### users object

Start by importing the users object, getting acces to the createUser, updateUser methods and the getUser object.

- getUser has two methods, getUserById and getUserByUid, wich takes your db instance real document _id and the uid the user was created with respectively.

    Both returns the user info or throws an error.
    <img width="898" alt="get users example" src="https://user-images.githubusercontent.com/81493770/146683806-c2f23198-97c4-402d-a852-f109e8c4a25f.png">

- createUser takes an unique id (ideally provided by your auth provider) and username and creates and returns a new instance of the user model in your db on success or throws an error.
    <img width="892" alt="createUser example" src="https://user-images.githubusercontent.com/81493770/146683380-ecce8e49-4cc3-4c5c-8d0b-c5af667de803.png">
    
- updateUser takes an existing user _id and a data object (meant to be the update), recomended if using typescript to use the types provided  
    <img width="896" alt="update users example" src="https://user-images.githubusercontent.com/81493770/146686872-f088a38e-5582-4faa-9bad-629a7ecc5272.png">

### tasks object

Start by importing the tasks object, getting acces to the createTask, updateTask, updateTaskUsers, updateTaskState methods and the getTask object.

- getTask has these methods, getTaskById, getTaskByGroupId and getTaskByUserId wich takes your db instance real document _id of the task,the group wich contains the task, or an user that has the task assigned respectively.

    Returns the task or throws an error.    
    <img width="482" alt="get tasks example" src="https://user-images.githubusercontent.com/81493770/146687087-29756bd5-9094-400f-b9c8-b23a556fddca.png">
   
