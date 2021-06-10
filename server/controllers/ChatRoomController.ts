import express, { response } from "express";
import chatroom from '../models/ChatRoomModel'



export const setUpChatRoom=async(req:any,res:any)=>{
    const ChatRoomOwnerId=req.params.id
    const ChatRoomOwner=req.user._id
    const Chat=[]  
        const createNewRoom = new chatroom({ChatRoomOwnerId,ChatRoomOwner,Chat})
        await createNewRoom.save()
        // console.log(createNewRoom)
        res.status(200)
   

}

export const storeMessage=async(message,ChatRoomOwnerId)=>{
    console.log("message",message);
    console.log("room owner",ChatRoomOwnerId);
    
    let room=await chatroom.findOneAndUpdate(ChatRoomOwnerId,{$push:{Chat:message}})
    console.log(room)
}


export const getChatroomId=async(req:any,res:any)=>{

    const ChatRoomOwner=req.params.id
    console.log("chatRoomOwner",ChatRoomOwner)
    const ChatRoom=await chatroom.findOne({ChatRoomOwner})
    if(ChatRoom)
    {
        console.log("chat Room",ChatRoom)   
         res.status(200).send({chatroom:ChatRoom.ChatRoomID})
    }
    else{
        console.log("nooooo");
        
        res.status(400).json({message:"User is not online"})
    }
}



export const getChatroomOwner=async(req:any,res:any)=>{
    try {
        res.status(200).send({Name:req.user.Name,id:req.user._id})
    } catch (error) {
        res.status(400).send(error)
    }


}