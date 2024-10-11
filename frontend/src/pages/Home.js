import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
  const main=localStorage.getItem('loggedInUser')
  const navigate=useNavigate();
  const handleLogout=()=>
  {
    localStorage.removeItem("loggedInUser")
    navigate('/login')
  }
  return (
    <div>
    <h1>Welcome {main}</h1>
    <button onClick={handleLogout}>Logout</button>
   
</div>
  )
}

export default Home