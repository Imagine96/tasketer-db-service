# Tasketer dbservice

A simple tool implementation to controll tasks and workflows inside groups of users.

## What does it use?

- Mongoose
- Typescript (recomended +)

## Usage

Once installed the package you can import the different functionalities by named import.

+ connect
+ disconnect
+ users
+ groups
+ tasks


### For connect to your mongo db instance

connect and disconnect 

<img width="469" alt="connect and disconnect example" src="https://user-images.githubusercontent.com/81493770/146683285-de21b332-2d4f-4431-b66c-a0824ad573a6.png">
    
### users object

Start by importing the users object, getting acces to the createUser, updateUser methods and the getUser object.

- getUser has two methods, getUserById and getUserByUid, wich takes your db instance real document _id and the uid the user was created with.
    Both returns the user info or throws an error.
    <img width="898" alt="get users examples" src="https://user-images.githubusercontent.com/81493770/146683806-c2f23198-97c4-402d-a852-f109e8c4a25f.png">


- createUser takes an unique id (ideally provided by your auth provider) and username and creates and returns a new instance of the user model in your db on success or throws an error.
    <img width="892" alt="importing the users object" src="https://user-images.githubusercontent.com/81493770/146683380-ecce8e49-4cc3-4c5c-8d0b-c5af667de803.png">
    
- updateUser 


