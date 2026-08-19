const pool = require('../db');

const getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};


// GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid event id.' });

    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  const { title, category, priority, due_date } = req.body;

  try {
     if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });}
    
    const [result] = await pool.execute(
      'INSERT INTO tasks (title, category, priority, due_date) VALUES (?, ?, ?)',
      [title, category, priority]
    );
    res.status(201).json({ id: result.insertId, title, category, priority, is_done: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

async function createEvent(req, res) {
  try {
    const { title, description, category_id, event_date, start_time, end_time, location, capacity } = req.body;
    const organizer_id = req.session.userId;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Event title cannot be empty.' });
    }

    const [result] = await pool.execute(
      `INSERT INTO Events (title, description, category_id, event_date, start_time, end_time, location, capacity, organizer_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, category_id, event_date, start_time, end_time, location, cap, organizer_id]
    );

    res.status(201).json({ message: 'Event created.', event_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create event.' });
  }
}