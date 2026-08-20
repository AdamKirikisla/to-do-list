// Get tasks
export async function getTasks() {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}

// Create Task
export async function createTask(data) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}