export const BASE_URL = 'https://alekseynikulin-back15.nomoreparties.co';
// export const BASE_URL = 'http://localhost:3001';
export const headers = {
  'Content-Type': 'application/json',
};
export const credentials = 'include';
export const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function getCards() {
  return fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    headers,
    credentials,
  })
    .then(checkResponse)
}

export function createCard(cardData) {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify(cardData),
    credentials,
  })
    .then(checkResponse)
}

export function deleteCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
    credentials,
  })
    .then(checkResponse)
}

export function addLikeToCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers,
    credentials,
  })
    .then(checkResponse)
}

export function removeLikeFromCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers,
    credentials,
  })
    .then(checkResponse)
}
export function changeLikeCardStatus(cardId, isLiked) {
  return (
    isLiked ? (
      removeLikeFromCard(cardId)
    ) : (
      addLikeToCard(cardId)
    )
  )
}

export function updateProfile(userData) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(userData),
    credentials,
  })
    .then(checkResponse)
}

export function updateAvatar(inputValue) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: `${inputValue}`,
    }),
    credentials,
  })
    .then(checkResponse)
}