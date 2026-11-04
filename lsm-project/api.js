// Frontend (HTML/JS/Bootstrap) theke backend call korar helper.
// Tomar HTML-e: <script src="api.js"></script> diye use koro.

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

async function api(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {};
  if (getToken()) headers['Authorization'] = 'Bearer ' + getToken();
  if (body && !isForm) headers['Content-Type'] = 'application/json';

  const res = await fetch(API_URL + path, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ---- Auth ----
async function login(email, password) {
  const data = await api('/auth/login', { method: 'POST', body: { email, password } });
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data.user; // role onujayi dashboard-e redirect koro
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

function redirectByRole(user) {
  const pages = { student: 'student.html', instructor: 'instructor.html', admin: 'admin.html' };
  window.location.href = pages[user.role];
}

// ---- Examples ----
// const courses = await api('/courses');
// await api('/courses/COURSE_ID/enroll', { method: 'POST' });
// await api('/assignments', { method: 'POST', body: { course, title, deadline } });
// File upload:
//   const fd = new FormData(); fd.append('file', fileInput.files[0]); fd.append('text', 'my answer');
//   await api('/assignments/ID/submit', { method: 'POST', body: fd, isForm: true });
// Quiz attempt:
//   await api('/quizzes/QUIZ_ID/attempt', { method: 'POST', body: { answers: [0, 1] } });
