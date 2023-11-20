import React, { useState } from 'react'
import { useContext } from 'react'
import noteAppcontext from '../context/Appcontext/Context'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/Modal.css'
import { useEffect } from 'react';

const NoteModalBox = () => {

  const context = useContext(noteAppcontext)
  const{handlechange,noteValue,addNotes,setNoteColor,updatenote,isEdit,setNotevalue,noteId}=context
  const [selectedColor, setSelectedColor] = useState(null)

    const modifynote=()=>{
      console.log(noteId)
      updatenote(noteId)
    }

    useEffect(()=>{
      
    var modal = document.getElementById("myModal");
    var closeModalBtn = document.getElementById("closeModalBtn");
    var openModalBtns = document.querySelectorAll(".openModal");
    openModalBtns.forEach((items)=>{
        items.onclick = function() {
        modal.style.display = "block";
      }
      })   
    if(isEdit){
      console.log("in edit mode")
      
    }
    else{
      
      console.log("not in edit mode")
      let openModalBtn = document.getElementById("openModalBtn");

      openModalBtn.onclick = function() {
        modal.style.display = "block";
      }
    }
  
  
  
  var element = document.getElementsByClassName("ql-editor");
  closeModalBtn.onclick = function() {
    setNotevalue({...noteValue,title:"",tag:""});
    console.log(element)
    element[0].innerHTML = ""
    modal.style.display = "none";
  }
  


  
  const colorSelectors = document.querySelectorAll('.color-selector');
  colorSelectors.forEach(selector => {
  
  selector.addEventListener('click', function() {
    const color = window.getComputedStyle(selector).backgroundColor;
    setNoteColor(color)
    
    if (selectedColor) {
      const prevSelectedColorElement = document.getElementById(selectedColor);
      if (prevSelectedColorElement) {
        prevSelectedColorElement.style.border = '2px solid black';
      }
    }

    selector.style.border = '2px solid red';
    setSelectedColor(selector.id);
    
  });

});

  
    })

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] },{"font": []}],
          ['bold', 'italic', 'underline','strike'],[{'color':[]},{"background": []}],['code-block','formula','link'],
          [{'list': 'ordered'}, {'list': 'bullet'},],
          
        ]
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike','color','background','font','code-block','formula','link',
        'list', 'bullet',
      
      ]

  const handleButtonClick = isEdit ? modifynote : addNotes;
  const buttonText = isEdit ? 'Modify Note' : 'Add Note';
  return (
    
    <>
    
    
    <div id="myModal" className="modal">

      <div id='modal-box' className="modal-content">
      <span className="close" id="closeModalBtn">&times;</span>
      <label htmlFor="title">Title</label>
      <input className='note-input' id='title' name='title' type="text" value={noteValue.title} onChange={handlechange} maxlength="50"/>
      <label htmlFor="tag">Tag</label>
      <input className='note-input' id='tag' name='tag' type="text" value={noteValue.tag} onChange={handlechange} maxlength="20" />
      <label htmlFor="color">Note Color</label>
      <div className="color-picker" id='color'>
      <div className="color-selector" id="color1"></div>
      <div className="color-selector" id="color2"></div>
      <div className="color-selector" id="color3"></div>
      <div className="color-selector" id="color4"></div>
      <div className="color-selector" id="color5"></div>
      <div className="color-selector" id="color6"></div>
      </div>
      <label htmlFor="description">Description</label>
      <div className="editor-container">
      <ReactQuill theme="snow" value={noteValue.description}  onChange={(description) => handlechange({ target: { name: 'description', value: description } })} modules={modules} formats={formats} bounds={`[className="editor-container"]`}/>

      </div>
      <button className='add-note-btn' onClick={handleButtonClick}>{buttonText}</button>
      </div>
    </div>
    </>
  )
}

export default NoteModalBox