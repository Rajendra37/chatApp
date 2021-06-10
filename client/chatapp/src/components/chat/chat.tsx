import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../service/service";
import { PersonCircle } from "react-bootstrap-icons";
import {storeMesssage} from '../../Action/action'
import "./chat.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat() {
  const dispatch = useDispatch();
  // const [message, setmessage] = useState('');
  // const [newChat, setnewChat] = useState<any>([]);
  const [CurrentUser, setCurrentUser] = useState('')
  const alluser = useSelector((posts: any) => posts.UserReducer.user);
  const newChat = useSelector((posts: any) => posts.ChatReducer);
  const roomOwner = useSelector((posts: any) => posts.UserReducer.chatRoomOwner);

  console.log("intial chat",newChat);
  
  let srObj = new service();
  useEffect(() => {
    srObj.getAllusers(dispatch);
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    const message=e.target.msg.value
    socket.emit("send", {
      Newmessage: message,
      reciever:CurrentUser
    });
    dispatch(storeMesssage({type:'send',message}))
    // setnewChat([...newChat,{type:'send',message}])
  };

  socket.on('setup',(chatroomID:any)=>{
    srObj.getChatRoomOwner(dispatch)
    // srObj.setUpChatroom(dispatch,chatroomID)
    // srObj.setUpChatroom(dispatch,chatroomID)
    socket.emit('setupChatroomOwner',roomOwner)
  })

  socket.on(`${roomOwner.id}`, (data: any) => {
    console.log("message",data);
    dispatch(storeMesssage({type:'recieve',message:data}))
    // setnewChat([...newChat,{type:'receved',message:data.Newmessage}])
  });




  const senduserData=async(id:any)=>{
    // let response:any=await srObj.getChatroom(id)
    console.log("user id",id);
    
    setCurrentUser(id)
  }

  return (
    <div className="main-div-of-chat">
      <div className="card-user">
        <h5 className="list-group-item">users</h5>
        {alluser ? alluser.map((myusers: any) => {
          return (
      
            <div className="list-group" onClick={()=>senduserData(myusers._id)}>
              <h6 className="list-group-item list-group-item-action">
                <PersonCircle size={20} /> {myusers.Name}
              </h6>
            </div>
          
          );
        }):<p>no users</p>}
      </div>

      <div className="card-chat">
      <div className="message-div">
        {newChat ? newChat.map((newdata: any, index: any) => {
          return <>
           
            <h6>{newdata.message}</h6>
            
         </>;
       
        }):<p>No chat Hiatory</p>}
          </div>
          

       <div style={{display:"flex",flexDirection:"row"}}>
         <form onSubmit={(e:any)=>sendMessage(e)}>
         <input
          type="text"
          className="form-control w-75"
          id="msg"
        />
        <button type="submit" className="btn w-25">
          send
        </button>
         </form>
       
       </div>
        
      </div>
    </div>
  );
}
