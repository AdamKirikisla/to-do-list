let tasks = [];

async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    tasks = await response.json();
    

    renderTasks(tasks);
    taskCounter(tasks)
    // taskCompleted(tasks)

  } catch (error) {
    console.log('Something went wrong:', error);
  }
}

function renderTasks(tasks) {
  const ul = document.querySelector('#task-list');

  if (tasks.length === 0) {
    ul.innerHTML = "<li><p>No Data</p></li>";
    return;
  }
  
  const items = tasks.map((task) => {
    return `
      <li class="task" data-id="${task.id}">
        <input type="checkbox" class="task-check" ${task.is_done ? 'checked' : ''}>
        <div class="task-info">
          <p class="task-title">${task.title}</p>
          <p class="task-meta">${task.category} · ${task.priority}</p>
        </div>
        <div class="task-actions">
          <button class="edit-btn" aria-label="Edit task">✏️</button>
          <button class="delete-btn" aria-label="Delete task">🗑️</button>
        </div>
      </li>
    `;
  }).join('');

  ul.innerHTML = items;
}

 function taskCounter(tasks){
  let counter = document.querySelector('#task-counter')
  counter.textContent = `${tasks.length} task${tasks.length === 1 ? '' : 's'}:`;

}

// function taskCompleted(tasks){
//   let counter = document.querySelector('#task-completed')
//   let completed = 0
//   for(let task of tasks){
//     if (task.is_done === true){
//       completed++
//     }
//   }
//   counter.textContent = completed
// }
loadTasks();