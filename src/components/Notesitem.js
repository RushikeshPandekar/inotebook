import React , {useContext} from 'react'
import { Link } from 'react-router-dom';
import NoteContext from '../contexts/NoteContext'

export default function Notesitem(props) {
    const context = useContext(NoteContext);
    let {deleteNote,setNote,setBtn} = context;

    const handeldelclick=()=>{
        deleteNote(props.note._id)
        props.giveAlert("Note Deleted Successfully !","Success")
    }
    const handeleditclick=()=>{
        setNote({title:props.note.title,description:props.note.description,tags:props.note.tags});
        setBtn(["Update",props.note._id]);
    }
  return (
    <>
    <div className='col-md-4 my-2'>
        <div className="card">
        <div className="card-header">
            <span>Tags : </span>
            {
                props.note.tags.length===0?"No tags Available ":(props.note.tags).map((ele,index)=>{
                    return <span className="badge bg-secondary mx-1" key={index}>{ele}</span>
                })
            }
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <p className="card-text">
                {props.note.description}
            </p>
            <p className='text-muted'>Note Created : {(new Date(props.note.date)).toGMTString()}</p>
            <i className="fa-solid fa-trash-can mx-2" onClick={handeldelclick}></i>
            <Link to='/'><i className="fa-solid fa-file-pen mx-2" onClick={handeleditclick}></i></Link>
        </div>
        </div>
    </div>
    </>
  )
}
