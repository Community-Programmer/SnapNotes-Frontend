import React, { useContext, useState } from 'react'
import image from '../images/reset.jpg'
import '../css/Auth.css'
import noteAppcontext from '../context/Appcontext/Context'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../config/Config'

const Reset = ({setProgress}) => {
    const [email,setEmail]=useState("")
    const navigate=useNavigate();

    const context=useContext(noteAppcontext)
    const {showAlert}=context

    const handlechange=(e)=>{
        setEmail(e.target.value)
      }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        setProgress(10)
        const response=await fetch(`${API_BASE_URL}/user/forgotpassword`,{
          method:'POST',
          body:JSON.stringify({email}),
          headers:{
            "Content-Type": "application/json"
          },
          credentials:'include',
        });
        const json=await response.json()
        console.log(json)
        setProgress(100)
        setEmail("")
    
        if(response.ok){
          showAlert('Password reset link has been sent to  email!', 'success')
          navigate('/login')
        }
        else{
          showAlert("User doesn't exist!", 'error')
        }
      }

  return (
    <div className="auth-main">
     
        <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Forgot Your <span>SnapNotes</span> Password? Reset It Here</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={handlechange}  placeholder='Enter Email'  required/>
        <button className='auth-btn' type="submit">Reset Password</button>
        </form>
        
        <div className="auth-image"><img src={image} alt="reset" /></div>
       
        {/* <button onClick={() => showAlert('Success message', 'success')} className='auth-btn'>Test</button> */}
    </div>
  )
}

export default Reset