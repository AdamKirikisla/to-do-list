export async function logout() {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' })

    if (res.ok) {
      window.location.href = '/'
    } else {
      console.log('Logout failed')
    }
  } catch (err) {
    console.log('failed to log out', err)
  }
}

const logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault(); // stop the <a href="#"> from jumping to top of page
  logout();
});