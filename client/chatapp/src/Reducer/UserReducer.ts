import { act } from "react-dom/test-utils";

const cookie=document.cookie;
const isLogin=cookie ? true :false
const initialData ={
    user:[],
    isLogin,
    allpost:[],
    SingleUserPost:[],
    chatRoomOwner:{}
}

const UserReducer=(state:any=initialData,action:any)=>
{
        switch(action.type){
            case 'ADD_USER':
                return{
                    ...state,user:{...state,user:[action.payload]}
                }

            case 'LOGIN_USER':
                return{
                    ...state, isLogin: action.payload 
                }

            case 'ALL_POSTS':
                return{
                    ...state,allpost:action.payload
                }

            case'ALL_USERS':
                return{
                    ...state,user:action.payload
                }
            case 'SINGLE_USER_POST':
                return{
                    ...state,SingleUserPost:action.payload
                }
                case 'POST_LIKE':
                    return{
                        ...state,allpost:action.payload
                    }
               
                case"STORE_CHAT_ROOMOWNER":
                return{
                    ...state,chatRoomOwner:action.payload
                }

                default:return state;
            

        }

}
export default UserReducer;