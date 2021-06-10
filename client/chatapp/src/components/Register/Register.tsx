import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {ToastContainer,toast} from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { service} from '../../service/service'
import login from '../../img/reg.png'
import 'react-toastify/dist/ReactToastify.css'
import './register.css'

toast.configure()

export default function Register() {

        let history = useHistory()
        const dispatch=useDispatch() 
        let srObj=new service();
        const [state, setstate] = useState({
            Name:"",
            email:"",
            password:""
        })
        
        
        const SubmitUserData=async(e:any)=>{
                e.preventDefault()    
               let response = await srObj.SendUserData(dispatch,state)
          
               console.log(response);
               
               if(response.status==201)  
               {
                    toast.success("Registerd...!",{position:toast.POSITION.TOP_CENTER})
                    history.push('/')
               }else if(response.status==422)
               {
                    toast.warning("you have an already account try to login...!",{position:toast.POSITION.TOP_CENTER})
                    
               }
               else if(response.status==401)
               {
                   toast.warning('Please Fill All The Fields...!',{position:toast.POSITION.TOP_CENTER}) 
               }
               
               
        }

        const handleUserData=(e:any)=>{
            setstate({...state,[e.target.name]:e.target.value})
        }

    return (
            <div>
                <div className="main-div">
                    <div className="img-div">
                        <img src={login} alt="book" height="100%" width="100%" />
                    </div>
                    <div className="form-div">
                        <h1>Register Here</h1>
                            <form onSubmit={SubmitUserData}>
                                <input type="text" name="Name" value={state.Name} onChange={handleUserData} className="form-control" placeholder="Enter First Name" />
                                <input type="email" name="email" value={state.email} onChange={handleUserData} className="form-control" placeholder="Enter Email Id" />
                                <input type="password" name="password" value={state.password} onChange={handleUserData} className="form-control" placeholder="Enter Password" />
                                
                                <button className="btn" data-toggle="modal" data-target="#exampleModal">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
    )
}
