import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../User.css'
function UserDashboard() {
  const [assignment, setAssignment] = useState({
    userId: localStorage.getItem('loggedInUser'),
    task: '',
    admin: '', 
  });
  const [admins, setAdmins] = useState([]);
  const navigate=useNavigate();

  
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:7000/auth/admins'); 
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:7000/auth/assignments', assignment);
      console.log('Assignment submitted:', response.data);
      navigate('/login')
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task:</label>
          <input
            type="text"
            name="task"
            value={assignment.task}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Admin:</label>
          <select
            name="admin"
            value={assignment.admin}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an admin</option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin.name}>
                {admin.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit Assignment</button>
      </form>
    </div>
  );
}

export default UserDashboard;
