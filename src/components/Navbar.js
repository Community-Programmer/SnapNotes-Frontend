import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../css/Navbar.css'
import noteAppcontext from '../context/Appcontext/Context'
import Alert from './Alert'
import API_BASE_URL from '../config/Config'

const Navbar = () => {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const context=useContext(noteAppcontext)
  const {userName,setuserName,alert,setAlert}=context

  const handleLogout = async()=>{
   await fetch(`${API_BASE_URL}/user/logout`,{
      method:'POST',
      credentials:'include'
    })
    setuserName(null)
    localStorage.removeItem('username');
    navigate('/')
    console.log("CHeck")

  }

  return (
    <>
    <nav className='navbar'>
        <div className="logo"><Link to="/">SnapNotes</Link></div>
        <div className={`links-container ${isOpen ? 'active' : ''}`}>
          <ul className="navlinks">
            <li><Link to="/" onClick={toggleNavbar}>Home</Link></li>
            <li><Link to="/notes" onClick={toggleNavbar}>My Notes</Link></li>
            <li><Link to="/about" onClick={toggleNavbar}>About Us</Link></li>
            <li><Link to="/contact" onClick={toggleNavbar}>Contact Us</Link></li>
        </ul>
        <div className="btn-container">
          {!userName && <><Link to='/login'><button onClick={toggleNavbar} className="session-btn">Login</button></Link>
            <Link to='/signup'><button className="session-btn" onClick={toggleNavbar}>Sign up</button></Link></>}
          {userName && <> <span><Link>{userName}</Link></span><Link><button onClick={handleLogout} className="session-btn-logout">Logout</button></Link></>}
            
        </div>
        </div>
        
        <i onClick={toggleNavbar} className=" burger fa-solid fa-bars fa-2xl"></i>
    {alert && (<Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)}/>)}
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar