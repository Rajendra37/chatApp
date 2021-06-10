

export const addUser=(data:any)=>{ 
    return{
        type:"ADD_USER",
       payload:data
    }
   
}

export const login=(data:any)=>{
    
    return{
        type:"LOGIN_USER",
        payload:data
    }
}


export const allPosts=(data:any)=>{
    return{
        type:"ALL_POSTS",
        payload:data
    }
}

export const users=(data:any)=>{
    return{
        type:"ALL_USERS",
        payload:data
    }

}

export const postOfUser=(data:any)=>{
    return{
        type:"SINGLE_USER_POST",
        payload:data
    }
}

export const likes=(data:any)=>{
    return{
        type:"POST_LIKE" ,
        payload:data       
    }
}

export const storeMesssage=(data:any)=>{
    console.log("msg in action",data);
    
    return{
        type:"STORE_MESSAGE",
        payload:data
    }
}
export const chatroomOwner=(data:any)=>{
    return{
        type:"STORE_CHAT_ROOMOWNER",
        payload:data
    }
}