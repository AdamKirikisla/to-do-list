const pool = require('../db');

const getCurrentUser = async (req, res) => {
  try {

    if (!req.session.userId) {
      return res.json({ isLoggedIn: false })
    }

    const [rows] = await pool.execute('SELECT username FROM Users WHERE user_id = ?', [req.session.userId])
    const user = rows[0];

    res.json({ isLoggedIn: true, username: user.username })

  } catch (err) {
    console.error('getCurrentUser error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {getCurrentUser};