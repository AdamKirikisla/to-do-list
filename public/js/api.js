// Get tasks
export async function getTasks() {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}

