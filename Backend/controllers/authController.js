const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/jwtUtils'); 

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) 
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
 };

// Login user

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      // Generate the token
      const token = generateToken(user._id);
  
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  const logoutUser = (req, res) => {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
    });
    
    res.status(200).json({ message: 'Logged out successfully' });
  };

module.exports = { registerUser, loginUser };