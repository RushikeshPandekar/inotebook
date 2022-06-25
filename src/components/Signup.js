import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
    const [credentials, setCredentials] = useState({username:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();

    const handelSubmit=async(e)=>{
        e.preventDefault();
        if(credentials.password===credentials.cpassword){
            const response = await fetch(`http://localhost:5000/api/auth/createNewUser`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:credentials.username,email:credentials.email,password:credentials.password})
            });
            const res=await response.json();
            if(res.success){
                localStorage.setItem("auth-token",res.authToken);
                props.giveAlert("Account Created Successfully ","Success");
                navigate("/", { replace: true });
            }
            else{
                props.giveAlert("Invalid Credentials","Danger");
            }
        }
        else{
            window.alert("passwords not matching")
        }
    }
    const onChangeHandeler=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    return (
        <div className='container mt-5'>
            <form className='container' onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input type="text" name="username" className="form-control" id="exampleInput" aria-describedby="emailHelp" value={credentials.username} onChange={onChangeHandeler} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email"  id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChangeHandeler} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control"  name="password" id="exampleInputPassword1" value={credentials.password} onChange={onChangeHandeler} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  name="cpassword" id="exampleInputPassword1" value={credentials.cpassword} onChange={onChangeHandeler} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
