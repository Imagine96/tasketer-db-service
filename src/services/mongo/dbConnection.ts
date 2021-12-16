import  mongoose  from "mongoose";

const db = mongoose.connection

const connect = async ( url: string, option = {}) => {
    try{
        await mongoose.connect(url, option)
        db.on('connecion', () => {
            console.log('connected to db')
        })
    }catch(err){
        throw new Error('could not connect to db')
    }
}

const disconnect = async () => {
    try{
        await db.close()
    }catch(err){
        throw new Error('could not disconnect from db')
    }
}

export default {connect, disconnect}