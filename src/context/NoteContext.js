import API_BASE_URL from "../config/Config";
import noteAppcontext from "./Appcontext/Context";
import React, { useEffect, useState } from 'react'

const NoteContext = (props) => {
  // const initialNotes=[]
  const [userName,setuserName]=useState(null)
  const [alert, setAlert] = useState(null);
  const [showAlertModal,setAlertModal]=useState(false)
  const [isEdit, setisEdit] = useState(false);
  const [isloaded, setisLoaded] = useState(false);
  const [notes,setNote]=useState([])
  const [noteColor,setNoteColor]=useState("")
  const [noteId,setNoteId]=useState("")
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Hide the alert after 3 seconds
  };


  useEffect(() => {
    const checkAuthentication = async () => {
        const response = await fetch(`${API_BASE_URL}/user/verify`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const json= await response.json()
        if (json.ok === true) {
          console.log(json)
          localStorage.setItem('username', json.data.username);
          setuserName(localStorage.getItem('username'))
        }
    };
    checkAuthentication();
    
  // eslint-disable-next-line
  }, []); 

  //State For  Notes
  const [noteValue,setNotevalue] = useState({title:"",tag:"",description:""})
  const handlechange=(e)=>{
    setNotevalue({...noteValue,[e.target.name]:e.target.value})

  }

  //Note Fetch Request
  const fetchNote= async()=>{
    const response= await fetch(`${API_BASE_URL}/note/getnotes`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include'
    })
    const json= await response.json()
    setNote(json)
    setisLoaded(true)
   
  }

  //Add notes
  const addNotes=async()=>{
    const {title,tag,description}=noteValue
    const response= await fetch(`${API_BASE_URL}/note/addnotes`,{
      method:'POST',
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({title:title,tag:tag,color:noteColor,description:description})
    })
    const json= await response.json()
    console.log(json)
    setNotevalue({...noteValue,title:"",tag:""});
    var element = document.getElementsByClassName("ql-editor");
    element[element.length-1].innerHTML = ""
    document.getElementById("myModal").style.display = "none";

    if(response.ok){
      showAlert('Note Created!', 'success')
    }
    fetchNote()
    
}

//Delete note
const deleteNote=async(id)=>{
const response = await fetch(`${API_BASE_URL}/note/deletenotes/${id}`,{
  method: 'DELETE',
  credentials: 'include'
})
const json= await response.json()
console.log(json)
fetchNote()
if(response.ok){
  showAlert('Note Deleted!', 'success')
}
}

//Update Note
const updatenote=async(id)=>{
  const {title,tag,description}=noteValue
  const respone = await fetch(`${API_BASE_URL}/note/updatenotes/${id}`,{
  method: 'PUT',
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  },
  body:JSON.stringify({title:title,tag:tag,color:noteColor,description:description})
  })
const json= await respone.json()
console.log(json)
setNotevalue({...noteValue,title:"",tag:""});
var element = document.getElementsByClassName("ql-editor");
element[element.length-1].innerHTML = ""
document.getElementById("myModal").style.display = "none";
fetchNote()

}

  return (
    <noteAppcontext.Provider value={{userName,setuserName,alert,setAlert,
    showAlert,fetchNote,notes,setNote,addNotes,handlechange,noteValue,setNotevalue,
    noteColor,setNoteColor,deleteNote,setisEdit,isEdit,updatenote,setNoteId
    ,noteId,showAlertModal,setAlertModal,isloaded, setisLoaded}}>
       {props.children}
    </noteAppcontext.Provider>
  )
}

export default NoteContext