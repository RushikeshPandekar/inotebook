import React,{ useState }  from 'react'
import NoteContext from './NoteContext';

const NoteState=(props)=> {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", description: "", tags: [] });
  const [btn, setBtn] = useState(["Add",""]);
  
  const host="http://localhost:5000";
  
  
  // Fetch Notes
  const getAllNotes=async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
    });
    const data=await response.json();
    setNotes(data);
  }


  // Add Note
  const addNote=async(title,description,tags)=>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      },
      body: JSON.stringify({title,description,tags})
    });
    const note=await response.json();
    if(note.errors===undefined){
      setNotes(notes.concat(note))
      return false;
    }
    else{
      return true;
    }
  }

  // Delete Note
  const deleteNote=async(id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token':localStorage.getItem('auth-token')
      }
    });
    const data=await response.json();
    const newNotes=notes.filter(note1=>note1._id!==id);
    setNotes(newNotes);
    return data.success;    
  }

  // Update Note
  const updateNote=async(id,title,description,tags)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      },
      body:JSON.stringify({title,description,tags})
    });
    const note=await response.json();
    if(note.errors===undefined){
      return false;
    }
    else{
      return true;
    }
  }
  return (
    <NoteContext.Provider value={{notes,addNote,note,setNote,deleteNote,getAllNotes,updateNote,btn,setBtn}}>
        {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;