import { getTasks, createTask, deleteTask } from './api.js';
import { renderTasks, taskCounter } from './render.js';

const form = document.querySelector('#add-task-form');
let tasks = [];
const taskList = document.querySelector('#task-list');


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







loadTasks();
