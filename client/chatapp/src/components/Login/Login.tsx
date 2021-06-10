import React,{useState,useEffect} from 'react'
import {NavLink ,useHistory} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import { service} from '../../service/service'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'
import "./login.css"
import loginI from '../../img/log.png'

toast.configure()
export default function Login() {

    const history=useHistory()
    const dispatch=useDispatch() 
    const [login, setlogin] = useState(true)
    let srObj=new service();
    const [loginData, setloginData] = useState({email:"",password:""})
    
    const handleLogindata=(e:any)=>{
        setloginData({...loginData,[e.target.name]:e.target.value})
    }
    const loginUsre=async(e:any)=>{
        e.preventDefault();
        let response=await srObj.loginUser(dispatch,loginData,login)
        if(response.status==200)
        {   
            // let token=await response.json()
            // console.log(token);          
            //  localStorage.setItem('userToken',(token))
            toast.success("Login Successfully...!",{position:toast.POSITION.TOP_CENTER})
            history.push('/profile')
        }
        else if(response.status==422)
        {
            toast.warning("Pleae fill all fields...!",{position:toast.POSITION.TOP_CENTER})
            history.push('/')
        }
        else
        {
            toast.error("Invalid Cridentials...!",{position:toast.POSITION.TOP_CENTER})
            history.push('/')
        }
        
    }


    return (
        <div className="main-div">
            <div className="img-div">
                <img src={loginI} alt="book" height="100%" width="100%" />
            </div>
        <div className="form-div">
            <h1>Login Here</h1>
            <form onSubmit={loginUsre}>
                <input type="email" name="email" value={loginData.email}  onChange={handleLogindata} className="form-control" placeholder="Enter Email Id" />
                <input type="password" name="password" value={loginData.password} onChange={handleLogindata}  className="form-control" placeholder="Enter Password" />
                <button className="btn" data-toggle="modal" data-target="#exampleModal">Login</button>
                <NavLink to="/register"><p>Register Here</p></NavLink>
           </form>
        </div>
        </div>
       
    )
}
