

import React, { useState }from 'react'
import '../App.css';
// import axios from 'axios'
import { useNavigate,Link} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import {handleSuccess,handleError} from '../utils'
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate=useNavigate();
const handlechange=async(ee)=>{
    
    const logininfo = {
        name: name,
        email: email,
        password: password,
        role:role,
    };

    ee.preventDefault();
    // setName(ee);
    console.log(name,email,password);

                   
    if(!name||!email||!password)
    {
        return handleError("fill all details")
    }
    try{
    const url=`http://localhost:7000/auth/signup`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logininfo)
    });
    const result = await response.json();
console.log(result)
 const{success,message,error}=result                    // result se {success variable} nikalna hai
if(success)
{
    handleSuccess(message)
    // alert("signup succesful")
    setTimeout(()=>{
        navigate('/login')
    },2000)
    
}
else{
    handleError(error)
    console.log("error occccured")
}
}
catch (error) {
    console.error('There was an error!', error); 
}

} 

  return (
    <>
    <ToastContainer />
    <form onSubmit={handlechange} >
       name<input type="text"  value={name} placeholder='Enter name'onChange={(e)=>setName(e.target.value)} /> 
       <br />
       email<input type="email" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
       <br />
      password<input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button className='btn' type='submit' >submit</button>
      {/* <button type='submit'>Signup</button> */}
                <span>Already have an account ?
                    <Link to="/login">Login</Link></span>
      </form>
      
    </>
  )
}

export default Signup