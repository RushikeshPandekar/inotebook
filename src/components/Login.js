import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();

    const handelSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const res=await response.json();
        if(res.success){
            localStorage.setItem("auth-token",res.authToken);
            props.giveAlert("Login Successful","Success");
            navigate("/", { replace: true });
        }
        else{
            props.giveAlert("Invalid Credentials","Danger");
        }
    }
    const onChangeHandeler=(e)=>{
        setCredentials({...credentials,[e.target.type]:e.target.value});
    }
    return (
        <div className='container mt-5'>
            <form className='container' onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChangeHandeler} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={onChangeHandeler} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
