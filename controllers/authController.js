const pool = require('../db');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const registerUser = async(req, res) => {

let { email, username, password } = req.body

  if ( !username || !email || !password ) {

    return res.status(400).json({ error: 'All fields are required.' })

  }

  
  email = email.trim()
  username = username.trim()

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {

    return res.status(400).json({ error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' })

  }

  if (!validator.isEmail(email)) {

    return res.status(400).json({ error: 'Invalid email format' })

}

 if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {

    return res.status(400).json({ error: 'Password must be at least 8 characters and include at least one letter and one number.' })

  }
 


    // Add user to db
  try {

    // Check if user already exists
    const [rows] = await pool.execute('SELECT user_id FROM Users WHERE email = ? OR username = ?', [email, username])

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email or username already in use.' })
     
    }

    // Hashing Logic
    const hashed = await bcrypt.hash(password, 10)

    // adds new user to db
    const [result] = await pool.execute('INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashed])

    // Express Session ID
    req.session.userId = result.insertId
    

    res.status(201).json({ message: 'User registered'})}

    catch (err) {

    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' })

  }
  
}

module.exports = {registerUser};
