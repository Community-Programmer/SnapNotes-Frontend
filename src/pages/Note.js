import React, { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import noteAppcontext from '../context/Appcontext/Context';
import '../css/Note.css'
import noteImage from '../images/note-image.jpg'
import NoteBox from '../components/NoteBox';
import NoteModalBox from '../components/NoteModalBox';
import AlertModal from '../components/AlertModal';
import API_BASE_URL from '../config/Config';



const Note = ({setProgress}) => {

  const context=useContext(noteAppcontext)
  const {showAlert,fetchNote,notes,deleteNote,setisEdit,showAlertModal,isloaded}=context
  const navigate=useNavigate();

  
  // const isUserLoggedIn = () => {
  //   const token = Cookies.get('token'); 
  //   console.log(token,!!token)
  //   console.log(Cookies.get())
  //   return !!token; 
  // };
 
  useEffect(()=>{
    setProgress(10)
    setTimeout(()=>{
      setProgress(100)
    },500)
  },[setProgress])

  useEffect(() => {
    const checkAuthentication = async () => {
      setProgress(10);
        const response = await fetch(`${API_BASE_URL}/user/verify`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const json= await response.json()
        if (json.ok === true) {
          fetchNote()
        } else {
          navigate('/login');
          showAlert('Please Login to Fetch Your Notes', 'info');
        }
        setProgress(100);
    };
    checkAuthentication();
    
  // eslint-disable-next-line
  }, []); 

 

  const displayModalBox=()=>{
    setisEdit(false)
    
  }
  return (
    
    <>

    {!isloaded ? (
        <dotlottie-player src="https://lottie.host/ad802668-8d60-4fcc-bc73-1253f5b62660/SJVwvHA4w1.json" background="transparent" speed="1" style={{
          width: '300px',
          height: '300px',
          margin: 'auto',
          display: 'block', 
          transform: 'translateY(50%)', 
        }} loop autoplay></dotlottie-player>
  ) : (<>
    {notes.length === 0 ? (
      <div className="container">
      <div className="image"><img src={noteImage} alt="noteImage" /></div>
      <div className="text">
        <h2>Looks like you don't have any notes yet. <span>Ready to start organizing your thoughts?</span> Create a new note now!</h2>
        <button id='openModalBtn' className='note-btn'>Create new note</button>
        <NoteModalBox/>
      </div>
    </div>
    ) : (
      <><button id='openModalBtn' onClick={displayModalBox}  className='note-btn-bottom'>+</button>
    <NoteModalBox/>
    {showAlertModal && <AlertModal/>}
    </> 
    )}</>
  )}
    
    

    <div id='note-box' className="notebox">
    {notes.length!==0 && notes.map((note,index)=>{
      return <NoteBox key={note._id} id={index} note={note} deleteNote={deleteNote}/>
    })}
    </div>

    </>
  )
}

export default Note