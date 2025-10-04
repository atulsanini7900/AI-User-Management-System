const User = require('../models/User');
const { generateUserBio } = require('../services/aiService');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    res.status(500).json({ 
      message: 'Error fetching user', 
      error: error.message 
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({ 
        message: 'Name, email, and role are required' 
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already exists. Please use a different email.' 
      });
    }

    // Generate AI bio
    console.log(`Generating AI bio for ${name}...`);
    const bio = await generateUserBio(name, role);

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role.trim(),
      status: status || 'active',
      bio
    });

    await user.save();
    
    console.log(`✅ User created: ${user.name}`);
    res.status(201).json(user);

  } catch (error) {
    console.error('Create user error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: messages 
      });
    }
    
    res.status(400).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
};

/**
 * PUT update user
 */
const updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // Find existing user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: req.params.id }
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          message: 'Email already exists. Please use a different email.' 
        });
      }
    }

    // Prepare update data
    const updateData = {
      name: name ? name.trim() : user.name,
      email: email ? email.toLowerCase().trim() : user.email,
      role: role ? role.trim() : user.role,
      status: status || user.status
    };

    // Regenerate bio if name or role changed
    if (name !== user.name || role !== user.role) {
      console.log(`Regenerating AI bio for ${updateData.name}...`);
      updateData.bio = await generateUserBio(updateData.name, updateData.role);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log(`✅ User updated: ${updatedUser.name}`);
    res.json(updatedUser);

  } catch (error) {
    console.error('Update user error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: messages 
      });
    }
    
    res.status(400).json({ 
      message: 'Error updating user', 
      error: error.message 
    });
  }
};

/**
 * DELETE user
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(`✅ User deleted: ${user.name}`);
    res.json({ 
      message: 'User deleted successfully',
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    res.status(500).json({ 
      message: 'Error deleting user', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};