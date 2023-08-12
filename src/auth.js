import {
  headers,
  BASE_URL,
  credentials,
  checkResponse,
} from './utils/Api';

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
    credentials,
  })
    .then(checkResponse)
};
export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
    credentials,
  })
    .then(checkResponse)
};

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
    credentials,
  })
    .then(checkResponse) 
}