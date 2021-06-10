import { addUser,login,allPosts,users,postOfUser,likes,chatroomOwner} from "../Action/action"

export class service{

 SendUserData=async(dispatch:any,data:any)=>{       
        let response=await fetch('http://localhost:5000/RegUser',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'} 
        })
        dispatch(addUser(data))
        return response;
    }

    loginUser=async(dispatch:any,data:any,loginState:any)=>{
            let response=await fetch('http://localhost:5000/loginUser',{
            method:'POST',
            body:JSON.stringify(data),
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            mode:'cors'
            })
            let loginData=await response.json();
            sessionStorage.setItem('userData',JSON.stringify(loginData))
            dispatch(login(loginState))
            return response;
           
    }
    
    verifyToken=async(dispatch:any)=>{
        let response=await fetch('http://localhost:5000/checktoken',{
            method:'GET',
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            mode:'cors'
            })
            return response;
    }

    logoutUser=async(dispatch:any)=>{

        let response=await fetch('http://localhost:5000/logout',{
            method:'GET',
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            mode:'cors'
            })
            return response;

    }

    createPost=async(dispatch:any,PostBody:any,url:any)=>{
            let response=await fetch('http://localhost:5000/create',{
            method:'POST',
            body:JSON.stringify({
                Postbody:PostBody,
                PostPhoto:url
            }),
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })
            let postData=response.json()
            // dispatch(allPosts(postData))
            return response;
    }

    getAllpost=async(dispatch:any)=>{
        
        let response=await fetch('http://localhost:5000/getallPost',{
            method:'GET',
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            mode:'cors'
            })
            let allPostFromServer=await response.json();
            dispatch(allPosts(allPostFromServer))
    }

    getAllusers=async(dispatch:any)=>{

        let response=await fetch('http://localhost:5000/alluser',{
            method:'GET',
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            mode:'cors'
            })
            let allUsersFromServer=await response.json();
            dispatch(users(allUsersFromServer))

    }
    getPostOfUser=async(dispatch:any)=>{

        let response=await fetch('http://localhost:5000/getPostOfOneUser',{
            method:'GET',
            credentials:"include",
            headers:{Accept:'application/json','Content-Type':'application/json'},
            mode:'cors'
            })
            let postFromServer=await response.json(); 
            dispatch(postOfUser(postFromServer))
    }

    likePost=async(id:any)=>{
        let response=await fetch('http://localhost:5000/like',{
            method:'PUT',
            body:JSON.stringify({
                PostId:id
            }),
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })
    }

    dislike=async(id:any)=>{
        
            let response=await fetch('http://localhost:5000/Unlike',{
            method:'PUT',
            body:JSON.stringify({
                PostId:id
            }),
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })

    }

    makeComment =async(dispatch:any,comment:any,id:any)=>{
        let response=await fetch('http://localhost:5000/commnet',{
            method:'PUT',
            body:JSON.stringify({
                text:comment,
                PostId:id
            }),
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })
            console.log("response of comment",await response.json());
            
    }

    setUpChatroom =async(dispatch:any,id:any)=>{
        console.log("in side chat api...");
        
        let response=await fetch('http://localhost:5000/chatSetup/'+id,{
            method:'PUT',
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })
            console.log("response of chatroom",response.status);
            
    }

    getChatroom =async(id:any)=>{
        console.log("in side chat get api...");
        
        let response=await fetch('http://localhost:5000/getChatRoom/'+id,{
            method:'GET',
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })
            let chatroomId=await response.json();
            return chatroomId;
            
    }

    getChatRoomOwner=async(dispatch:any)=>{
        let response=await fetch('http://localhost:5000/getChatRoomOwner',{
            method:'GET',
            headers:{Accept:'application/json','Content-Type':'application/json'},
             mode:'cors',
            credentials:"include"
            })
            let chatroom=await response.json();
            dispatch(chatroomOwner(chatroom))
            return chatroomOwner;
    }




}

