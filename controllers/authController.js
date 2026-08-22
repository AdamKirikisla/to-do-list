const validator = require('validator');

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
  console.log(req.body)

  return res.status(201).json({ message: 'User registered successfully.' })

}


module.exports = {registerUser};