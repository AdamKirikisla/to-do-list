let tasks = [];

async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    tasks = await response.json();

    const ul = document.querySelector('#task-list');

    if (tasks.length === 0) {
      ul.innerHTML = "<li><p>No Data</p></li>";
      return;
    }

    for (let task of tasks) {
      // render each task next
    }

  } catch (error) {
    console.log('Something went wrong:', error);
  }
}

loadTasks()