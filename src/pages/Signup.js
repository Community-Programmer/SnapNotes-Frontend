import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../images/Mobile-login-Cristina.jpg'
import '../css/Auth.css'
import { useEffect } from 'react'
import noteAppcontext from '../context/Appcontext/Context'
import API_BASE_URL from '../config/Config'

const Signup = ({setProgress}) => {
  const context=useContext(noteAppcontext)
  const {showAlert}=context
  useEffect(()=>{
    setProgress(10)
    setTimeout(()=>{
      setProgress(100)
    },500)
  },[setProgress])
  const navigate=useNavigate()
  const [credential,setcredential]=useState({username:"",email:"",password:""})
  const handlechange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
  }

  const handlesubmit=async (e)=>{
    e.preventDefault()
    const {username,email,password}=credential
    const response=await fetch(`${API_BASE_URL}/user/signup`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({username,email,password})
    })
    const json=await response.json()
    console.log(json)
    if(response.ok){
      navigate('/login')
      showAlert('Signup Successful, Login Using Your Credentials','info')
    }
    else{
      showAlert('User already exist with this email address', 'error')
    }
  }

  function showpass() {
    console.log("yes")
    var x = document.getElementById("password-signup");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password"; 
    }
  }

  return (
    <div className="auth-main">
     
        <form className="auth-form" onSubmit={handlesubmit}>
        <h1>Join <span>SnapNotes</span> Today</h1>
        <p>Welcome to SnapNotes, your digital note-taking companion.</p>
        <label htmlFor="username">Username</label>
        <input type="username" name="username" id="username" value={credential.username} onChange={handlechange} placeholder='Enter Username' maxlength="25"  required/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={credential.email} onChange={handlechange} placeholder='Enter Email'  required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password-signup" value={credential.password} onChange={handlechange} placeholder='Enter Password' required/>
        <div class="show">
              <input type="checkbox" onClick={showpass}/> Show Password
          </div>
        <button className='auth-btn' type="submit">Sign Up</button>
        <p>Already have an account? <Link to='/login'>Log in here</Link> </p>
        
        </form>
        
        <div className="auth-image"><img src={image} alt="signup" /></div>
    </div>
  )
}

export default Signup