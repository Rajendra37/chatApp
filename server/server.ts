import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import Router from "./routes/route";
import cookieParser from 'cookie-parser';
import {storeMessage} from './controllers/ChatRoomController'
import http from 'http'

const socket =require('socket.io')



function envConfigFunction() {
  env.config();
}

async function ConnectToDB() {
  const conStr = `mongodb://localhost:27017/ChatApp`;
// const conStr = "mongodb+srv://101yogeshsharma:Pcn2uRZa!qw983.@cluster0.idwtk.mongodb.net/Lookup?retryWrites=true&w=majority";
  console.log("Initalizing connection with DB");

  mongoose.connection.on("error", (error: any) => {
    console.log(`error in database ${error.message}`);
  });
  await mongoose.connect(conStr, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Connection initalized....");
}

function EnvirnmentSetup() {
  const server = express();
   server.use(cookieParser());
  server.use(cors({credentials:true,origin:'http://localhost:3000'}));
  server.use(express.json());
  return server;
}

const startServer = async () => {
  await ConnectToDB();
  const server = await EnvirnmentSetup();
  envConfigFunction();
  const serverStart = server.listen(process.env.PORT);
  serverStart.on("error", (error: any) => {
  console.log(`server error`, error.message); 
});
    const io=socket(serverStart,{cors:{origin:['http://localhost:3000']}})
    io.on('connection',(socket)=>{
    // socket.owner="rajendra"
    console.log('connected to socket..',socket.id); 
    socket.emit('setup',socket.id)
    socket.on('setupChatroomOwner',(details:any)=>{
      socket.chatRoomOwner=details.Name
      socket.chatRoomOwnerId=details.id
    })

    
    socket.on('send',(data)=>{
      // io.sockets.emit('chat',data.Newmessage)
      console.log("reciver",data.reciever);
      console.log("message",data.Newmessage);
      storeMessage(data.Newmessage,socket.chatRoomOwnerId)
      io.sockets.emit(`${data.reciever}`,data.Newmessage)

    });
  })

  server.use(Router);
};
let newServer=startServer()
  .then(() => console.log(`server started on port ${process.env.PORT}`))
  .catch((error: any) => {
    console.log(`error while starting of server ${error.message}`);
  });

  


