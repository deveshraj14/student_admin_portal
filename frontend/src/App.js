import React from 'react'
import { Routes,Route,Navigate  } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

import PrivateRoute from './Privatecomponent'
import Admin_dashboard from './pages/Admindashboard'
import User_dashboard from './pages/Userdashboard'

function App() {
  
  return (
    <>
    
    <Routes>
      
      <Route path='/' element={<Navigate to='/login' />} />
     
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route path='/admindashboard/:admin' element={<Admin_dashboard/>}/>
      <Route path='/userdashboard' element={<User_dashboard/>}/> */}
       <Route path='/admindashboard/:admin' element={<PrivateRoute element={<Admin_dashboard />} />} />
       <Route path='/userdashboard' element={<PrivateRoute element={<User_dashboard />} />} />
      
      
    </Routes>
    </>
  )
}

export default App