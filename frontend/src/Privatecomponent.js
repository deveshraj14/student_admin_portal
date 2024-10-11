// import React from 'react'
// import { Navigate,Outlet } from 'react-router-dom'

// function Privatecomponent() {
//     // const auth=localStorage.getItem('loggedInuser')
//     const auth = localStorage.getItem('token');
//   return (
//     auth && auth.token?<Outlet/>:<Navigate to = "/signup"/>
//   )
// }

// export default Privatecomponent



import React from 'react';
import { Navigate } from 'react-router-dom';

// A simple function to check if the user is authenticated
const isAuthenticated = () => {
  // Check localStorage or any other authentication method
  return !!localStorage.getItem('loggedInUser'); // Replace with your actual authentication logic
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to='/login' />;
};

export default PrivateRoute;
