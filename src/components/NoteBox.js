
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css'; 
import '../css/NoteBox.css';
import moment from 'moment';
import { useContext } from 'react';
import noteAppcontext from '../context/Appcontext/Context';
import { useState } from 'react';


const NoteBox = ({ note,deleteNote, id}) => {
  const codeRef = useRef(null);
  const contentRef = useRef(null);

  const [isToggled, setToggled] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const contentElement = contentRef.current;
    if(isToggled){
      
      if (contentElement) {
        const isVerticalOverflowed = contentElement.scrollHeight > contentElement.clientHeight;
        setIsOverflowed(isVerticalOverflowed);
      }
    }

    window.onclick = function(event) {
      var body = document.getElementById("note-box");
      if (event.target === body) {
        setToggled(false)
      }
      
    }
  }, [isToggled]);

 

  const handleToggle = () => {
    setToggled(!isToggled);
    console.log("Activated")
  };
  const context=useContext(noteAppcontext)
  const {setisEdit,notes,setNotevalue,noteValue,setNoteColor,setNoteId,setAlertModal}=context

  const displayModalBox=(e)=>{
    const id=e.target.id

    console.log("The note associated: ",notes[id])
    console.log(notes[id].title,notes[id].tag,notes[id].description)
    setNotevalue({...noteValue,title:notes[id].title,tag:notes[id].tag});
    // setNotevalue({title: notes[id].title ,tag:notes[id].tag})
    var element = document.getElementsByClassName("ql-editor")
    element[element.length-1].innerHTML = notes[id].description
    setNoteColor(notes[id].color)
    setisEdit(true)
    setNoteId(note._id)
  }
 
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  
  }, [note.description]);

 

  const handleDeleteNote = () => {
    setAlertModal(true)
    setNoteId(note._id)
  };

  const renderHTML = (html) => {
    return { __html: html };
  };

  var note_timestamp=moment(note.createdAt).format('MMMM Do YYYY, h:mm:ss a')
  var update_note_timestamp=moment(note.updatedAt).format("YYYYMMDD hh:mm:ss a")

  const [updateTime,setTimeupdate]=useState(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeupdate(moment(update_note_timestamp, "YYYYMMDD hh:mm:ss a").fromNow())
    }, 1000);

    return () => clearInterval(intervalId);
  }, [update_note_timestamp]);
 

  return (
    <>
    

    <div ref={contentRef}  className={`note-box ${isToggled ? 'note-box-toogle' : ''}`} style={{ backgroundColor: note.color }} >
      <div className="note-title">{note.title}</div>
      <div className="note-tag">{note.tag}</div>
      <div className="ql-snow note-content">
        <div className="ql-editor">
            <div ref={codeRef}  dangerouslySetInnerHTML={renderHTML(note.description)} />
        </div>
      </div>
       {updateTime && <div className="update-timestamp">Updated {updateTime}</div>}

      <div className={`note-icons ${isOverflowed ? 'note-icons-toogle' : ''}`} >
        <div className="timestamp">{note_timestamp}</div>
        {!isToggled && <i class="fa-solid fa-expand fa-xl" onClick={handleToggle}></i>}
        {isToggled && <i class="fa-solid fa-compress fa-xl" onClick={handleToggle}></i>}
        
        <i className="fas fa-trash fa-xl" onClick={handleDeleteNote}></i>
        <i id={id} className="fas fa-edit fa-xl openModal"  onClick={displayModalBox} ></i>

      </div>
    </div>
    
  
    </>
  );
};

export default NoteBox;