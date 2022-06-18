import React from 'react'
import { Link } from 'react-router-dom';

export default function Notesitem(props) {
    const {note}=props;
  return (
    <div className='col-md-4 my-2'>
        <div className="card">
        <div className="card-header">
            <span>Tags : </span>
            {
                (note.tags).map((ele,index)=>{
                    return <span className="badge bg-secondary mx-1" key={index}>{ele}</span>
                })
            }
        </div>
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
                {note.description}
            </p>
            <Link to="/" className="btn btn-primary">Go somewhere</Link>
        </div>
        </div>
    </div>
  )
}
