const signupForm = document.querySelector(".signup-form")

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = signupForm.username.value.trim()
  const email = signupForm.email.value.trim()
  const password = signupForm.password.value.trim()
  const submitButton = document.querySelector(".signup-submit")

  submitButton.disabled = true

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    const data = await res.json()

    if (res.ok) {
      window.location.href = '/log-in.html'
    } else {
      console.error(data.error || 'Signup failed')
    }
  } catch (err) {
    console.error('Network error:', err)
  } finally {
    submitButton.disabled = false
  }
})