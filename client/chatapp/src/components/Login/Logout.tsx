import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {NavLink ,useHistory} from 'react-router-dom'
import { service} from '../../service/service'


export default function Logout() {
    const history=useHistory()
    const dispatch=useDispatch() 
    let srObj=new service();

    useEffect(() => {
        const logout=async()=>{
            let res=await srObj.logoutUser(dispatch)
            if(res.status==200)
            {
                    history.push('/')
            }
        }
        logout()
      
    }, [])



    return (
        <div>
            {/* <h1>logout</h1> */}
        </div>
    )
}
