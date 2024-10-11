const registermodel = require("../models/registered");
const brypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");
const User = require('../models/registered');
const Admin = require('../models/Admin'); 
const Assignment = require('../models/Assignment'); 
const Signup = async (req, resp) => {
  try {
    const { name, email, password,role} = req.body;
    const userwala = await registermodel.findOne({ email });
    if (userwala) {
      resp.status(409).json("userss already exist");
    } else {
      const savewala = new registermodel({ name, email, password ,role: role || 'user',});
      savewala.password = await brypt.hash(password, 10);
      await savewala.save();
      resp.status(201).json({
        message: "Signup successfully",
        success: true,
      });
    }
  } catch (err) {
    resp.status(500).json({ message: "error has occur" });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await registermodel.findOne({ email });
    // const selectrole = await registermodel.findOne({ role });

    if (!user) {
      return res.status(403).json({
        message: "User does not exist. Register first.",
        success: false,
      });
    }
    if (role && user.role !== role) {
      return res.status(403).json({
        message: "User does not have the authority.",
        success: false,
      });
    }
    

    const isPasswordCorrect = await brypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json("Incorrect password");
    }

    // Generate JWT token
    const jwt = jwttoken.sign(
      { email: user.email, _id: user._id,role: user.role },    //role: user.role
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      jwt,
      email,
      name: user.name,
      // role: user.role,
      role: user.role,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};




const getAdmins = async (req, res) => {
  // try {
  //   // const admins = await Admin.find({}, 'name'); // Fetch only the admin names
  //   const {name} = req.body;
  //   const admins = await Admin.find({name});
  //   res.json(admins);
  // } catch (error) {
  //   console.error('Error fetching admins:', error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }

  try {
    // Fetch only users with the role of 'admin'
    const admins = await registermodel.find({ role: 'admin' }, 'name'); // Fetch only the admin names
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};

// Controller to submit an assignment
const submitAssignment = async (req, res) => {
  const { userId, task, admin } = req.body;

  if (!userId || !task || !admin) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newAssignment = new Assignment({
      userId,
      task,
      admin,
      timestamp: new Date(), // Add a timestamp field to track when the assignment was submitted
    });

    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAssignmentsForAdmin = async (req, res) => {
  const adminName = req.query.admin // Assuming admin name is coming from a decoded JWT
  // const { admin } = req.body;
  try {
    // const assignments = await Assignment.find({ admin: adminName });
    const assignments = await Assignment.find({ admin: adminName });
    res.status(200).json(assignments);
  } catch (error) {    
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const acceptAssignment=async(req,res)=>{

  const assignmentId = req.params.id;
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { status: 'Accepted' }, // Update the status to Accepted
      { new: true } // Return the updated document
    );

    if (!updatedAssignment) {
      return res.status(404).send('Assignment not found');
    }

    res.json(updatedAssignment);
  } catch (error) {
    console.error('Error accepting assignment:', error);
    res.status(500).send('Server error');
  }
}

const deleteAssignment = async (req, res) => {
  // router.put('/auth/:id/reject', async (req, res) => {
    const { id } = req.params; // Get the assignment ID from the URL
    try {
      const updatedAssignment = await Assignment.findOneAndDelete(
        id,
        { status: 'Rejected' }, // Update the status of the assignment
        { new: true } // Return the updated document
      );
  
      if (!updatedAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      res.status(200).json("succesfilly deleted"); // Send the updated assignment back
    } catch (error) {
      console.error('Error rejecting assignment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { Signup, Login, getAdmins,submitAssignment,getAssignmentsForAdmin,deleteAssignment , acceptAssignment};
