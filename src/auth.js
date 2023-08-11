// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://alekseyNikulin - back15.nomoreparties.co';

const headers = {
  'Content-Type': 'application/json',
};
const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then(checkResponse)
};
export function authorize(password,email ) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then(checkResponse)
};

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
    .then(checkResponse) 
}