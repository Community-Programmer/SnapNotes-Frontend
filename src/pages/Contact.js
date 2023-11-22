import React, { useContext } from 'react'
import { useEffect,useState } from 'react'
import image from '../images/contact-image.jpg'
import '../css/Contact.css'
import noteAppcontext from '../context/Appcontext/Context'
import API_BASE_URL from '../config/Config'


const Contact = ({setProgress}) => {

  const [info,setinfo]=useState({name:"",email:"",message:""})
  const context= useContext(noteAppcontext);
  const {showAlert}=context
  const handlechange=(e)=>{
  setinfo({...info,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  const {name,email,message}=info;
  setProgress(10)
  const response=await fetch(`${API_BASE_URL}/user/contact`,{
    method:'POST',
    body:JSON.stringify({name,email,message}),
    headers:{
      "Content-Type": "application/json"
    }
  });
  const json=await response.json()
  console.log(json)
  setProgress(100)

  if(response.ok){
    
    showAlert('Message sent!', 'success')
    setinfo({name:"",email:"",message:""})
  }
  else{
    showAlert('Please fill all the details', 'error')
  }
}

    useEffect(()=>{
        setProgress(10)
        setTimeout(()=>{
          setProgress(100)
        },500)
      },[setProgress])
  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
      <h1>Contact Us - <span>SnapNotes</span></h1>
      <p>Contact us using below form or mail us at - sarthakpatel230204@gmail.com</p>
        <label htmlFor="name">Name</label>
        <input type="name" name="name" id="name" value={info.name} onChange={handlechange} placeholder='Enter Name'  required/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={info.email} onChange={handlechange} placeholder='Enter Email'  required/>
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" cols="30" rows="10" value={info.message} onChange={handlechange}></textarea>
        <button className='auth-btn' type="submit">Submit</button>
       

      </form>
      <div className="contact-image"><img src={image} alt="contact" /></div>
    </div>
  )
}

export default Contact