async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    if (data.isLoggedIn) {
      const navLinks = document.querySelector('.nav-links');
      navLinks.innerHTML = `
        <a href="task.html">My Tasks</a>
        <a href="#" id="logout-btn" class="nav-signup">Logout</a>
      `;

      document.getElementById('logout-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.reload();
      });

      const heroButtons = document.querySelector('.hero-buttons');
      heroButtons.innerHTML = `
        <a href="task.html" class="hero-signup">View Tasks</a>
      `;
    }
  } catch (err) {
    console.log('Auth check failed:', err);
  }
}

checkAuth();