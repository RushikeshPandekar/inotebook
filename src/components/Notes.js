import React ,{ useContext} from 'react';
import NoteContext from '../contexts/NoteContext'
import Notesitem from './Notesitem';

function Notes() {
  const context=useContext(NoteContext);
  let {notes,setNodes}=context;
  return (
    <div className='container'>
      <div className="row">
        {
          notes.map((note,index)=>{
             return <Notesitem note={note} key={index}/>
          })
        }
      </div>
    </div>
  )
}

export default Notes