document.addEventListener('DOMContentLoaded', () => {
  loadHTMLTable([])
});

function loadHTMLTable(data) {
  const ul = document.querySelector('#task-list');

  if (data.length === 0) {
    ul.innerHTML = "<li><p>No Data</p></li>";
    return;
  }
}