const pool = require('../db');

// GET /api/tasks
const getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tasks');
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

    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push('title = ?');
      values.push(title);
    }
    if (category !== undefined) {
      fields.push('category = ?');
      values.push(category);
    }
    if (priority !== undefined) {
      fields.push('priority = ?');
      values.push(priority);
    }
    if (is_done !== undefined) {
      fields.push('is_done = ?');
      values.push(is_done);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields provided to update' });
    }

    values.push(id);

    const [result] = await pool.execute(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`,
      values
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

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };