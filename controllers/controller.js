const pool = require('../db');

// GET /api/tasks
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
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid task id.' });

    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
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
  const { title, category, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const safeCategory = category || 'work';
  const safePriority = priority || 'medium';

  try {
    const [result] = await pool.execute(
      'INSERT INTO tasks (title, category, priority) VALUES (?, ?, ?)',
      [title, safeCategory, safePriority]
    );
    res.status(201).json({
      message: 'Task Created',
      id: result.insertId,
      title,
      category: safeCategory,
      priority: safePriority,
      is_done: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};


// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  const { title, category, priority, is_done } = req.body;
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid task id.' });

    const [result] = await pool.execute(
      `UPDATE tasks SET title = ?, category = ?, priority = ?, is_done = ? WHERE id = ?`,
      [title, category, priority, is_done, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid task id.' });

    const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};