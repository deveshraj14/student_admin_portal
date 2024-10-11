import React, { useState }from 'react'
import {Link,useNavigate } from "react-router-dom"
import {handleSuccess,handleError} from '../utils'
import { ToastContainer } from 'react-toastify';
import '../App.css'
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    // const navigate=useNavigate();
    const handleRoleChange = (event) => {
        setRole(event.target.value);
      };
    const navigate=useNavigate();

const handlechange=async(ee)=>{
    
    const logininfo = {
        email: email,
        password: password,
        role:role,
    };

    ee.preventDefault();
    // setName(ee);
    console.log(email,password);

                   // BOTH ARE CORRECT METHOD 

                   
    // axios.post('http://localhost:5000/auth/login',{name,email,password})
    // .then(result=>console.log(result))
    // .catch(err=>console.log(err))
    if(!email||!password)
    {
        return handleError("fill all details")
    }
    try{
    const url=`http://localhost:7000/auth/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logininfo)
    });
    const result = await response.json();
console.log(result)
const { success, message,jwt,name,role}=result   // result se {success variable} nikalna hai
if(success)
{
    handleSuccess(message)
   
    localStorage.setItem('token', jwt);
    localStorage.setItem('loggedInUser', name);
   
    if (role === 'admin') {
      navigate(`/admindashboard/${name}`); 
    } else {
      navigate('/userdashboard');}

    // setTimeout(()=>{
    //     navigate('/')
    // },2000)
    
}
else{
    // handleError(error || message)
    handleError("No user found , check email and password")
    console.log("error occccured")
}
}
catch (error) {
    console.error('There was an error!'); 
}

} 

  return (
    <>
    <ToastContainer/>
    <form onSubmit={handlechange} >
       email<input type="email" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
       <br />
      password<input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <br />
      




<div>
        <label>
          <input
            type="radio"
            value="user"
            checked={role === 'user'}
            onChange={handleRoleChange}
          />
          User
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={handleRoleChange}
          />
          Admin
        </label>
      </div>






      <button className='btn' type='submit' >submit</button>
      <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
      </form>
    </>
  )
}

export default Signup