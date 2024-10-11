import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const { admin } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [acceptedAssignments, setAcceptedAssignments] = useState({});
  const navigate=useNavigate();
  useEffect(() => {
    
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/auth/assignments?admin=${admin}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setAssignments(response.data); 
        
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError('Failed to fetch assignments');
      }
    };

    fetchAssignments();
  }, [admin]);

  
  const handleAccept = async (assignmentId) => {
    try {
      await axios.put(`http://localhost:7000/auth/${assignmentId}`); 
      setAssignments(assignments.map(assignment => 
        assignment._id === assignmentId ? { ...assignment, status: 'Accepted' } : assignment
      ));
      setAcceptedAssignments(prev => ({ ...prev, [assignmentId]: true })); 
    } catch (err) {
      console.error('Error accepting assignment:', err);
    }
  };
  
  const handleReject = async (assignmentId) => {
    try {
      
      await axios.delete(`http://localhost:7000/auth/${assignmentId}`);
      
      
      setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
      
    } catch (err) {
      console.error('Error rejecting assignment:', err);
    }
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Navigate back to the login page
  };
  return (

      
      
    <div>
      <h1>Admin Dashboard {admin}
         
        </h1>
        <div style={{ position: 'relative' }}>
        <button 
        onClick={handleLogout} 
        style={{ position: 'absolute', top: '-163px', right: '-140px' }}
      >
        Logout
      </button>
      </div>
      
      {assignments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Task</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.userId}</td>
                <td>{assignment.task}</td>
                <td>{new Date(assignment.timestamp).toLocaleString()}</td>
                <td>{assignment.status || 'Pending'}</td>
                
      <td>
                  {acceptedAssignments[assignment._id] ? (
                    <span>Your assignment is accepted</span> // Display acceptance message
                  ) : (
                    <>
                      <button onClick={() => handleAccept(assignment._id)}>Accept</button>
                      <button onClick={() => handleReject(assignment._id)}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assignments found</p>
      )}
      
    </div>
  );
}

export default AdminDashboard;
