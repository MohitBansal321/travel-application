import React, {useRef} from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import "./Login.css";
import axios from "axios"; 
const Login = ({setShowLogin,setCurrentUser}) => {
  
    const nameRef=useRef();
    const passRef=useRef();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newUser={
            userName:nameRef.current.value,
            password:passRef.current.value,
        }
        console.log(newUser);
        try {
            const response=await axios.post("/users/login",newUser)
            // Produce a success notification
            console.log(response);
            setCurrentUser(response.data.userName)
            setShowLogin(false)
        } catch (err) {
            // produce a failing notification
            console.log(err);
        }
    }
    return (
    <div className='login_container'>
        <div className="application">
            <ExitToAppIcon/>
            Login to your profile
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='username' ref={nameRef}/>
            <input type="password" placeholder='password' ref={passRef}/>
            <button className="login_button">Login</button>
        </form>
        <CancelIcon className='login_cancel' onClick={()=>setShowLogin(false)}/>
    </div>
  )
}

export default Login