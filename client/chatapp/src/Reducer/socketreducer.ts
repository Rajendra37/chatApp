import io from 'socket.io-client'
 
 const socket=io('http://localhost:5000')
 

 export const socketReducer=(state=socket,action:any)=>{
    switch(action.type){
        
        case"CONNECT":
        return {
            ...state
        }

        default:return state;
        
    }
}