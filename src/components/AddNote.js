import React, {useEffect,useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import NoteContext from '../contexts/NoteContext';
import Notesitem from './Notesitem';
export default function AddNote(props) {
    const context = useContext(NoteContext);
    // const navigate=useNavigate();
    let {addNote,getAllNotes,updateNote,note,setNote,notes,btn,setBtn} = context;

    const handelOnClick =async () => {
        if(btn[0]==="Add"){
            let isErrors=await addNote(note.title,note.description,note.tags);
            setNote({ title: "", description: "", tags: [] });
            if(!isErrors)
            props.giveAlert("Note Added Successfully !","Success")
            else
            props.giveAlert("Enter a Valid Note !","Danger")
        }
        else{
            let isErrors=await updateNote(btn[1],note.title,note.description,note.tags);
            setNote({ title: "", description: "", tags: [] });
            setBtn(["Add",""]);
            if(!isErrors)
            props.giveAlert("Note Updated Successfully !","Success")
            else
            props.giveAlert("Enter a Valid Note !","Danger")
        }
    }
    const handelOnChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const addTag = async() => {
        const tag = document.getElementById("tags").value;
        if(tag===""){
            return;
        }
        setNote({...note,"tags":note.tags.concat(tag)});
        document.getElementById("tags").value = "";
    }
    const delTag=(e)=>{
         const val=document.getElementById(e.target.title).innerText;
         let temp=note.tags.filter(tag => tag!==val.toString())
         setNote({...note,"tags":temp})
    }
    useEffect(() => {
        if(localStorage.getItem('auth-token'))
            getAllNotes();
        else
            localStorage.removeItem('auth-token');
        // eslint-disable-next-line
    }, [btn])
    
    return (
        <div>
            <div className="container my-5">
                <h1>INotebook</h1>
                <div className="card">
                    <h5 className="card-header">Add a Note</h5>
                    <div className="card-body">
                        <div className="form-floating">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="title" placeholder="Title" value={note.title} onChange={handelOnChange} name="title"/>
                                <label htmlFor="floatingInput">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control my-2" placeholder="Note" id="floatingTextarea2"
                                    style={{ height: "100px" }} value={note.description} onChange={handelOnChange} name="description"></textarea>
                                <label htmlFor="floatingInput">Note</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="tags" style={{ width: "80%", display: "inline" }} placeholder='Tags' />
                                <i className="fa-solid fa-plus fa-2xl" style={{ position: "relative", right: "40px" }} onClick={addTag}></i>
                                <label htmlFor="floatingInput">Tags</label>
                            </div>
                            <div>
                                {
                                    (note.tags).map((ele,ind)=>{
                                        return <span className="badge bg-secondary mx-1" key={ind} id={`tag-${ind}`} value={ele}>{ele}<i className="fa-solid fa-xmark mx-1" title={`tag-${ind}`} onClick={delTag}></i></span>
                                    })
                                }
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary my-2" id="addNote" onClick={handelOnClick}>{btn[0]}</button>
                    </div>
                </div>
                <div className='container'>
                    <h1 className="mt-2 text-center">Recent Notes</h1>
                    <hr />
                    <div className="row">
                        {
                        notes.map((note,index)=>{
                            return notes.length-index<=3 && <Notesitem note={note} giveAlert={props.giveAlert} key={index}/>   
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
