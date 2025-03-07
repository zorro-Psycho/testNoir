// const pool = require('../../config/db'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql } = require('@vercel/postgres');
require('dotenv').config();


// User registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // Check if the email already exists in the database
    // console.log(process.env.POSTGRES_URL);
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    console.log("existonmg", existingUser);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword}) RETURNING *`;
    // console.log(newUser);

    // Generate JWT token
    const token = jwt.sign({ user_id: newUser.rows[0].user_id }, process.env.JWT_SECRET);

    // Respond with success and token
    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: error.message });
  }
};
//   

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await sql`SELECT * FROM Users WHERE email = ${email}`;

    if (user.rows.length === 0) return res.status(400).json('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) return res.status(400).json('Invalid credentials');

    const token = jwt.sign({ user_id: user.rows[0].user_id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
    
     res.json({ token });
    //  console.log(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = user.id;
    next();
  });
};
