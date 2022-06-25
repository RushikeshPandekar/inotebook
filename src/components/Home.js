import React from 'react'
import AddNote from './AddNote'
import LoginRedirector from './LoginRedirector'

export default function Home(props) {
  return (
    <div>
       { 
       localStorage.getItem('auth-token')!==null ? 
       <AddNote giveAlert={props.giveAlert}/> : 
       <LoginRedirector/>
       }
    </div>
  )
}
