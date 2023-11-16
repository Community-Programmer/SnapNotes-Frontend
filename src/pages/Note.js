import React, { useContext,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import noteAppcontext from '../context/Appcontext/Context';
import '../css/Note.css'
import noteImage from '../images/note-image.jpg'
import NoteBox from '../components/NoteBox';
import NoteModalBox from '../components/NoteModalBox';
import AlertModal from '../components/AlertModal';



const Note = ({setProgress}) => {

  const context=useContext(noteAppcontext)
  const {showAlert,fetchNote,notes,deleteNote,setisEdit,setNotevalue,noteValue,showAlertModal}=context
  const navigate=useNavigate();

  
  const isUserLoggedIn = () => {
    const token = Cookies.get('token'); 
    return !!token; 
  };

  useEffect(()=>{
    if(!isUserLoggedIn()){
      navigate('/login')
      showAlert('Please Login to Fetch Your Notes', 'info')
    }
    else{
      fetchNote()
    }
    setProgress(10)
    setTimeout(()=>{
      setProgress(100)
    },500)

    

    

  // eslint-disable-next-line
  },[])

  const displayModalBox=()=>{
    setisEdit(false)
    setNotevalue({...noteValue,title:"",tag:""});
    var element = document.getElementsByClassName("ql-editor");
    element[element.length-1].innerHTML = ""
    
  }
  return (
    
    <>

    {notes.length===0 && (<div className="container">
      <div className="image"><img src={noteImage} alt="noteImage" /></div>
      <div className="text">
        <h2>Looks like you don't have any notes yet. <span>Ready to start organizing your thoughts?</span> Create a new note now!</h2>
        <button id='openModalBtn' className='note-btn'>Create new note</button>
        <NoteModalBox/>
      </div>
    </div>)}
    <div className="notebox-container">

    <div id='note-box' className="notebox">
    {notes.length!==0 && notes.map((note,index)=>{
      return <NoteBox key={note._id} id={index} note={note} deleteNote={deleteNote}/>
    })}
    </div>
    </div>

    {notes.length !== 0 && (<><button id='openModalBtn' onClick={displayModalBox}  className='note-btn-bottom'>+</button>
    <NoteModalBox/>
    {showAlertModal && <AlertModal/>}
    </> 
  )}

    </>
  )
}

export default Note