import { getTasks, createTask, deleteTask, updateTask } from './api.js';
import { renderTasks, taskCounter } from './render.js';

const form = document.querySelector('#add-task-form');
let tasks = [];
const taskList = document.querySelector('#task-list');

// Get current user + welcome message
async function loadUser() {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    if (!data.isLoggedIn) {
      window.location.href = '/log-in.html';
      return;
    }

    document.querySelector('#welcome-message').textContent = `Welcome, ${data.username}`;
  } catch (error) {
    console.log('Something went wrong:', error);
  }
}

// Load tasks
async function loadTasks() {
  try {
    tasks = await getTasks();
    renderTasks(tasks);
    taskCounter(tasks);
  } catch (error) {
    console.log('Something went wrong:', error);
  }
}

// Create Task
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.task.value.trim();
  const priority = form['priority-forms'].value;
  const category = form['category-forms'].value;

  if (!title || !priority || !category) return;

  try {
    const newTask = await createTask({ title, priority, category });
    tasks.push(newTask);
    renderTasks(tasks);
    taskCounter(tasks);
    form.reset();
  } catch (error) {
    console.log('Something went wrong:', error);
  }
});


// Delete Task
taskList.addEventListener('click', async (e) => {
  
  // front-end
  if (!e.target.matches('.delete-btn')) return;
  const button = e.target
  const li  = button.closest(".task")
  const id = li.dataset.id;
  li.remove()

  // back-end
   try {
    await deleteTask(id);
    tasks = tasks.filter(task => task.id !== Number(id));
    renderTasks(tasks);
    taskCounter(tasks);
  } catch (error) {
    console.log('Something went wrong:', error);
  }

});


// Update Task
const updateCard = document.querySelector('.update-card');
const updateForm = document.querySelector('.update-form');
const editTitleInput = document.querySelector('#edit-title');
const editPrioritySelect = document.querySelector('#edit-priority');
const editCategorySelect = document.querySelector('#edit-category');
const cancelBtn = document.querySelector('.cancel-btn');

let editingId = null;

// Hide the card by default
updateCard.style.display = 'none';

// Open edit card when ✏️ is clicked
taskList.addEventListener('click', (e) => {
  if (!e.target.matches('.edit-btn')) return;

  const li = e.target.closest('.task');
  const id = Number(li.dataset.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  editingId = id;
  editTitleInput.value = task.title;
  editPrioritySelect.value = task.priority;
  editCategorySelect.value = task.category;

  updateCard.style.display = 'flex';
});

// Cancel closes the card, discards changes
cancelBtn.addEventListener('click', () => {
  editingId = null;
  updateCard.style.display = 'none';
  updateForm.reset();
});

// Save changes
updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (editingId === null) return;

  const data = {
    title: editTitleInput.value.trim(),
    priority: editPrioritySelect.value,
    category: editCategorySelect.value
  };

  try {
    await updateTask(editingId, data);
    tasks = tasks.map(task =>
      task.id === editingId ? { ...task, ...data } : task
    );
    renderTasks(tasks);
    taskCounter(tasks);
    editingId = null;
    updateCard.style.display = 'none';
    updateForm.reset();
  } catch (error) {
    console.log('Something went wrong:', error);
  }
});

// Toggle Task Done
taskList.addEventListener('change', async (e) => {
  if (!e.target.matches('.task-check')) return;

  const li = e.target.closest('.task');
  const id = li.dataset.id;
  const is_done = e.target.checked;

  try {
    await updateTask(id, { is_done });
    tasks = tasks.map(task =>
      task.id === Number(id) ? { ...task, is_done } : task
    );
    renderTasks(tasks);
    taskCounter(tasks);
  } catch (error) {
    console.log('Something went wrong:', error);
  }
});
// Filters
// Filters
const filtersSection = document.querySelector('#filters-form');
const prioritySelect = document.querySelector('#filters-form select[name="priority"]');
const statusSelect = document.querySelector('#filters-form select[name="status"]');
const categorySelect = document.querySelector('#filters-form select[name="category"]');

function getVisibleTasks() {
  const priority = prioritySelect.value;
  const status = statusSelect.value;
  const category = categorySelect.value;

  return tasks.filter(task => {
    const matchesPriority = priority === 'all' || task.priority === priority;
    const matchesCategory = category === 'all' || task.category === category;
    const matchesStatus =
      status === 'all' ||
      (status === 'done' && task.is_done) ||
      (status === 'open' && !task.is_done);

    return matchesPriority && matchesCategory && matchesStatus;
  });
}

filtersSection.addEventListener('change', () => {
  renderTasks(getVisibleTasks());
});

loadUser();

loadTasks();
