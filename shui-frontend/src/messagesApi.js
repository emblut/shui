import { handleResponse } from '../utils/api';

const API_URL = 'https://9yne1dfcyc.execute-api.eu-north-1.amazonaws.com';

export async function getMessages(username, sortOrder) {
  const params = new URLSearchParams();
  if (username) {
    params.append('username', username);
  }
  if (sortOrder) {
    params.append('sortOrder', sortOrder);
  }
  const url = `${API_URL}/messages?${params.toString()}`;

  const response = await fetch(url);
  return await handleResponse(response);
}

export async function createMessage(username, text, color) {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, text, color }),
  });
  return await handleResponse(response);
}

export async function updateMessage(id, username, text) {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, username, text }),
  });
  return await handleResponse(response);
}
