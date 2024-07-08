
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  pool  = require('../../config/db'); 
const authenticateToken = require('../../config/authenticateToken');

const router = express.Router();
  
router.put('/update-username', authenticateToken, async (req, res) => {
    const { newUsername } = req.body;
    const userId = req.user.user_id; 
    // console.log(userId);
  
    if (!newUsername) {
      return res.status(400).json({ message: 'New username is required' });
    }
  
    try {
      // Check if the new username is already taken
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [newUsername]);
      if (result.rows.length > 0) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
  
      // Update the username
      await pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [newUsername, userId]);
  
      res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Endpoint to update password
router.put('/update-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.user_id; // Ensure req.user.id is set correctly
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }
  
    try {
      // Get the current password hash
      const result = await pool.query('SELECT password FROM users WHERE user_id = $1', [userId]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the current password with the stored hash
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password
      await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, userId]);
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;

