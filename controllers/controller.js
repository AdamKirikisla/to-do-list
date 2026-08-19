const pool = require('../db');

// GET /api/tasks
exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};