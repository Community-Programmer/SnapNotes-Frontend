import React, { useContext } from 'react'
import image from '../images/reading-person.jpg'
import '../css/Home.css'
import noteAppcontext from '../context/Appcontext/Context'
import { Link} from 'react-router-dom'
import { useEffect } from 'react'

const Home = ({setProgress}) => {
  useEffect(()=>{
    setProgress(10)
    setTimeout(()=>{
      setProgress(100)
    },500)
  },[setProgress])
  const context=useContext(noteAppcontext)
  const {userName}=context
  return (
    
    <div className="main">
      
       <div className="text">
        <h1>Welcome to <span>SnapNotes!</span>, Where Ideas Find a Home. Effortlessly capture, organize, and access your notes.</h1>
        <p>SnapNotes is the perfect platform for all your note-taking needs. From quick to-do lists to in-depth project plans, we've got you covered. With seamless organization features, collaboration options, and user-friendly design, YourNote is your ideal digital notebook.</p>
        {!userName && <Link to='/signup'><button className="cta-btn">Get Started</button></Link>}
        {userName && <Link to='/notes'><button className="cta-btn">Open Notebook</button></Link>}
       </div>
       <div className="image">
        <img src={image} alt="reading-person" />
       </div>
       
    </div>
  )
}

export default Home