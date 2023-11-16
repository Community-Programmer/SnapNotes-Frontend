import React from 'react'
import '../css/AlertModal.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import noteAppcontext from '../context/Appcontext/Context'

const AlertModal = () => {

  const context=useContext(noteAppcontext)
  const {setAlertModal,deleteNote,noteId}=context

  const handleDelete=()=>{
    deleteNote(noteId)
    setAlertModal(false)
    

  }

   useEffect(()=>{

    var closeAlert=document.getElementById('closeAlertModal')
    closeAlert.onclick=function(event){
       setAlertModal(false)
      
    }

    window.onclick = function(event) {
      var alertModal = document.getElementById("AlertModal");
      if (event.target === alertModal) {
        setAlertModal(false)
      }
      
    }
   })
  
  
  return (
    <>
    
    <div className="modal-Alert" id="AlertModal">
      <div className="alertModal">
      <span className="close" id="closeAlertModal">&times;</span>
      <div className="alert-content">
        <span>Are you sure want to delete this note?</span>
        <button className='Alert-btn'  onClick={handleDelete}>Yes</button>
        <button className='Alert-btn' onClick={function handleModal(){setAlertModal(false)}}>No</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default AlertModal