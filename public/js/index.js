import { getTasks, createTask } from './api.js';
import { renderTasks, taskCounter } from './render.js';

const form = document.querySelector('#add-task-form');
let tasks = [];

async function loadTasks() {
  try {
    tasks = await getTasks();
    renderTasks(tasks);
    taskCounter(tasks);
  } catch (error) {
    console.log('Something went wrong:', error);
  }
}

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
loadTasks();
