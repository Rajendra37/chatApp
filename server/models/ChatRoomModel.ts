import mongoose from 'mongoose'

const{ObjectId}=mongoose.Schema.Types
const chatRoomSchema=new mongoose.Schema({
        ChatRoomOwnerId:{
            type:String,
            
        },
        ChatRoomOwner:{
                type:ObjectId,
                unique:true,
                ref:"user"
        },
        Chat:[],
       
      

})


const chaRoomModel:any=mongoose.model('chatRoom',chatRoomSchema)
export default chaRoomModel