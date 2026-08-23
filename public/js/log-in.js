const loginForm = document.querySelector(".login-form")
const errorEl = document.querySelector(".login-error");

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = loginForm.email.value.trim()
  const password = loginForm.password.value.trim()
  const submitButton = document.querySelector(".login-submit")

  submitButton.disabled = true

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      window.location.href = "task.html";
    } else {
      errorEl.textContent = data.error || 'Login failed'
    }
  } catch (err) {
    console.error('Network error:', err)
  } finally {
    submitButton.disabled = false
  }
})