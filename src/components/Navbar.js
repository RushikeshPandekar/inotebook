import React from 'react'
import { useState,useContext } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import NoteContext from '../contexts/NoteContext';


export default function Navbar() {
  let location = useLocation();
  const context = useContext(NoteContext);
  let {notes} = context;
  const signout=()=>{
     localStorage.removeItem('auth-token');
  }
  const [username, setUsername] = useState('')
  const getUser=async()=>{
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
    });
    const user=await response.json();
    setUsername(user.name);
  }
  useEffect(() => {
     getUser();
  }, [notes]);
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">INoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/yournotes"?"active":""}`} aria-current="page" to="/yournotes">Your-Notes</Link>
                </li>
              </ul>
              
              {localStorage.getItem('auth-token')===null ? <><Link className="btn btn-outline-success mx-1" to="/login"type="submit">Login</Link>
              <Link className="btn btn-outline-success mx-1" to="/signup"type="submit">SignUp</Link></>:<div> <div className="btn btn-secondary" data-bs-container="body">
              <i className="fa-solid fa-user"></i> {username}
              </div> <Link className="btn btn-outline-success mx-1" to="/login" onClick={signout} type="submit">Signout</Link></div>}
            </div>
          </div>
        </nav>
    </div>
  )
}
