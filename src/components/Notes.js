import React ,{ useContext , useEffect } from 'react';
import NoteContext from '../contexts/NoteContext'
import Notesitem from './Notesitem';

function Notes(props) {
  const context=useContext(NoteContext);
  let {notes,getAllNotes}=context;
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [notes])
  
  return (
    <div className='container my-5'>
      <h1 className="my-4 text-center">Your Notes</h1>
      <hr />
      <div className="row">
        {
          localStorage.getItem('auth-token') && notes.map((note,index)=>{
            return <Notesitem note={note} giveAlert={props.giveAlert} key={index}/>   
          })
        }
      </div>
    </div>
  )
}

export default Notes;