async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  const msg = document.getElementById('message');
  if (res.ok) {
    msg.style.color = 'green';
    msg.textContent = 'Login exitoso. Token: ' + data.token;
  } else {
    msg.style.color = 'red';
    msg.textContent = data.message;
  }
}

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  const msg = document.getElementById('message');
  if (res.ok) {
    msg.style.color = 'green';
    msg.textContent = data.message;
  } else {
    msg.style.color = 'red';
    msg.textContent = data.message;
  }
}
