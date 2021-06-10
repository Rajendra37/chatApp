const messages :any=[]

const ChatReducer=(state=messages,action:any)=>{

    switch(action.type)
        {
            case "STORE_MESSAGE":
               state=[...state,action.payload]
                return state
            
             default:return state;

        }
}
export default ChatReducer;