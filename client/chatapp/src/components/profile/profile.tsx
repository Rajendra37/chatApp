import React,{useEffect,useState} from 'react'
import { service } from "../../service/service";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './profile.css'


export default function Profile() {
    let srObj=new service();
    const dispatch=useDispatch()    
    const post = useSelector((mypost:any) => mypost.UserReducer.SingleUserPost)
    useEffect(() => {
        srObj.getPostOfUser(dispatch)
    }, [post])

    let data=JSON.parse(sessionStorage.getItem('userData')!)
    return (
        
        <div className="container">
           <div className="card-profile">
           <div className="card-body profile-img-div">
                   <img src='https://picsum.photos/200' alt=" profile-pic" />
                   <div className="name-div">
                   <h3>{data.name}</h3>
                   <h5>{data.email}</h5>
                   </div>  
               </div>
               <hr />
               <div className ="post-div">  
               {post ? post.map((mypost:any)=>{
                    return (<img src={mypost.PostPhoto} alt=" profile-pic" />
                 )
                }):<p> no post..</p>
            } 
             </div>   
         
           </div>
        </div>
        
    )
}
