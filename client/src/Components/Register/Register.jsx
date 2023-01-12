import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from 'react';
import axios from 'axios';
import './Register.css';
const Register = ({setShowRegister}) => {
  const nameRef=useRef();
  const emailRef=useRef();
  const passRef=useRef();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newUser={
      userName:nameRef.current.value,
      email:emailRef.current.value,
      password:passRef.current.value
    }
    try {
      const response=await axios.post("/users/register",newUser)
      console.log(response);
      // Notifiy for success
      setShowRegister(false)
    } catch (err) {
      // set failing notification
      console.log(err);
    }

  }
  return (
    <div className="register_container">
      <div className="application">
          <ExitToAppIcon/>
          Create a Profile.
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='userName'ref={nameRef}/>
        <input type="email" placeholder='email'ref={emailRef}/>
        <input type="password" placeholder='password'ref={passRef}/>
        <button className="register_button">Register</button>
      </form>
      <CancelIcon className='register_cancel' onClick={()=>setShowRegister(false)}/>
    </div>
  )
}

export default Register