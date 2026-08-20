let tasks = [];

async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    tasks = await response.json();

    renderTasks(tasks);

  } catch (error) {
    console.log('Something went wrong:', error);
  }
}