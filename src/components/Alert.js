import React from 'react'

export default function Alert(props) {
  return (
      props.alert && <div className={`alert alert-${props.alert.type.toLowerCase()} position-absolute`} style={{height:"50px",width:"100vw"}} role="alert">
       <strong>{props.alert.type==="Danger"?"Error":props.alert.type} : </strong>{props.alert.message}
    </div>
  )
}