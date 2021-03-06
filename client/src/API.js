let API_URL = 'https://opga-api.tcousin.com';

if (window.location.hostname === 'localhost') {
  API_URL = 'http://localhost:3000';
}

export async function isAdmin() {
  const response = await fetch(`${API_URL}/auth/isAdmin`);
  return response.json();
}
