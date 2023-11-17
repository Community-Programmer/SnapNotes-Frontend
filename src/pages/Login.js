import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../images/Mobile-login-Cristina.jpg'
import '../css/Auth.css'
import { useEffect } from 'react'
import noteAppcontext from '../context/Appcontext/Context'
import API_BASE_URL from '../config/Config'

const Login = ({setProgress}) => {
  const navigate=useNavigate();
  useEffect(()=>{
    setProgress(10)
    setTimeout(()=>{
      setProgress(100)
    },500)
  },[setProgress])

  
  

  const [credential,setcredential]=useState({email:"",password:""})
  const handlechange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})

  }

  const context=useContext(noteAppcontext)
  const {setuserName,showAlert}=context

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {email,password}=credential;
    setProgress(10)
    const response=await fetch(`${API_BASE_URL}/user/login`,{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type": "application/json"
      },
      credentials:'include',
    });
    const json=await response.json()
    console.log(json)
    setProgress(100)

    if(response.ok){
      
      // window.location.reload()
      showAlert('Login Successful', 'success')
      setuserName(json.username)
      setTimeout(()=>{
        navigate('/')
      },1500)
    }
    else{
      showAlert('Invalid Credentials', 'error')
    }
  }

  function showpass() {
    console.log("yes")
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password"; 
    }
  }
  
  return (
    <div className="auth-main">
     
        <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Welcome Back to <span>SnapNotes</span></h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={credential.email} onChange={handlechange} placeholder='Enter Email'  required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={credential.password} onChange={handlechange} placeholder='Enter Password' required/>
        <div className="show">
            <input type="checkbox" onClick={showpass}/> Show Password
          </div>
        <button className='auth-btn' type="submit">Login</button>
        <p>Don't have an account yet? <Link to='/signup'>Register here</Link> </p>
        <p>Forgot your password? <Link to='/reset'>Reset it here</Link> </p>
        </form>
        
        <div className="auth-image"><img src={image} alt="login" /></div>
       
        {/* <button onClick={() => showAlert('Success message', 'success')} className='auth-btn'>Test</button> */}
    </div>
  )
}

export default Login