import React from 'react';

import Notes from './Notes';

export default function Home() {
  return (
    <div>
        <div className="container my-2">
          <h1>Magic Notes</h1>
          <div className="card">
            <h5 className="card-header">Add a Note</h5>
            <div className="card-body">
              <div className="form-floating">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="titleTxt" placeholder="Title"/>
                  <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control my-2" placeholder="Leave a comment here"  id="floatingTextarea2" 
                  style={{height: "100px"}}></textarea>
                  <label htmlFor="floatingInput">Note</label>
                </div>
                </div>
                <button type="button" className="btn btn-primary my-2" id="addNote">Add</button>
            </div>
          </div>

          <div className="displayNotes">
            <h1 className="m-3">Your Notes</h1>
            <button type="button" className="btn btn-primary my-2" id="deleteAll">Delete All</button>
          </div>
          <hr/>
          <div className="row container-fluid" id="notes">
                <Notes/>
          </div>
        </div>
    </div>
  )
}
