import React,{useEffect} from 'react';
import './index.css';
import Login from '../src/components/Login/Login';
import {Route,Switch,useHistory} from "react-router-dom";
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import {useDispatch} from 'react-redux'
import { service} from './service/service'
import Logout from './components/Login/Logout';
import Chat from './components/chat/chat';
import Home from './components/Home/Home';
import Profile from './components/profile/profile';

function App() {

  const history=useHistory()
  const dispatch=useDispatch()
  const srObj=new service()

  useEffect(() => {
    const checkCookie=async()=>{
      let response=await srObj.verifyToken(dispatch)
      console.log(response);
      if(response.status==401)
      {
        history.push('/')
      }
    }
    checkCookie();      
  },[])
  const Routing=()=>{
    return(
        <>
        
        <Header/>
        <div style={{marginTop:"80px"}}>
          <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/home" component={Home}/>
              <Route path="/chat" component={Chat}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/logout" component={Logout}/>
          </Switch>
          </div>
          </>
    )
  }
  return (<>
   
       
        <Routing/>
      </>
  );
}

export default App;
