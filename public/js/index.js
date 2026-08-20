import { getTasks } from './api.js';
import { renderTasks, taskCounter } from './render.js';

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

loadTasks();