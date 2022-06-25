import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginRedirector() {
  return (
    <div className='container' style={{backgroundImage:""}}>
        <div class="card my-5" >
        <div class="card-body">
            <h5 class="card-title">INoteBook</h5>
            <h6 class="card-subtitle mb-2 text-muted">Login Or Signup To Start Using INoteBook</h6>
            <p class="card-text">Login Or Signup To Start Using INoteBook App And Start Storing Your Person Notes on Cloud with Security You Can Add Your Notes to Your Personal Notes that are only visible to you and You Can Edit Delete Your Notes</p>
            <Link className="btn btn-outline-success mx-1" to="/login" type="submit">Login</Link>
            <Link className="btn btn-outline-success mx-1" to="/signup" type="submit">SignUp</Link>
        </div>
        </div>
    </div>
  )
}
