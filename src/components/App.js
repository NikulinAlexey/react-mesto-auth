import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext'

// Импорт компонентов:
import Main from './Main';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import api from '../utils/Api';
import * as auth from '../auth';
import Register from './Register';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import ConfirmPopup from './ConfirmPopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ProtectedRouteElement from './ProtectedRouteElement';

function App() {
  // Стейт переменные:
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});                 // Для API редактирования пользователя и получения карточек
  const [selectedCard, setSelectedCard] = useState(null);
  const [userData, setUserData] = useState({ email: 'email' });       // Для API авторизации
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);

  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [buttonTextConfirmPopup, setButtonTextConfirmPopup] = useState('Да');
  const [buttonTextSavePopup, setButtonTextSavePopup] = useState('Сохранить');

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // Смена state-ов:
  function closeAllPopups() {
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setIsDeletePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
  }
  function onSignout() {
    localStorage.clear('jwt');
    setLoggedIn(false);
  }
  function onLogin(email) {
    setUserData({
      email: email
    });
    setLoggedIn(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setSelectedCardToDelete(card)
  }

  // API запросы:
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {

      })
  }
  function handleCardDelete(card) {
    setButtonTextConfirmPopup('Удаление...')

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item !== card))
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setButtonTextConfirmPopup('Да');
      })
  }
  function handleUpdateUser(userData) {
    setButtonTextSavePopup('Сохранение...')

    api.editProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setButtonTextSavePopup('Сохранить')
      })
  }
  function handleAddPlaceSubmit(cardData) {
    setButtonTextSavePopup('Сохранение...')

    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setButtonTextSavePopup('Сохранить')
      })
  }
  function handleUpdateAvatar(avatarInputValue) {
    setButtonTextSavePopup('Сохранение...');

    api.changeAvatar(avatarInputValue)
      .then(() => {
        setCurrentUser({
          avatar: avatarInputValue,
          name: currentUser.name,
          about: currentUser.about,
        })
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setButtonTextSavePopup('Сохранить')
      })
  }
  useEffect(() => {
    setIsSpinnerVisible(true);

    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsSpinnerVisible(false)
      })
  }, []);
  useEffect(() => {
    api.getProfileInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {

      })
  }, []);
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      auth.checkToken(jwt)
        .then(({ email }) => {
          if (email) {
            setUserData({email})
            console.log(email)
          }
        })
        .then(() => {
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userData={userData} onSignout={onSignout}  />

        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              cards={cards}
              loggedIn={loggedIn}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onAddPlace={handleAddPlaceClick}
              isSpinnerVisible={isSpinnerVisible}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardDeleteClick={handleDeleteCardClick}
              setIsDeletePopupOpen={setIsDeletePopupOpen}
            />}
          />

          <Route path='/sign-up' element={<Register />} />

          <Route path='/sign-in' element={<Login onLogin={onLogin} />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <Footer loggedIn={loggedIn} />
      </div>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        textOfButton={buttonTextSavePopup}
      />

      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        textOfButton={buttonTextSavePopup}
      />

      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        textOfButton={buttonTextSavePopup}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ConfirmPopup
        onClose={closeAllPopups}
        isOpen={isDeletePopupOpen}
        onDelete={handleCardDelete}
        card={selectedCardToDelete}
        textOfButton={buttonTextConfirmPopup}
      />

      <InfoTooltip
        loggedIn={loggedIn}
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
