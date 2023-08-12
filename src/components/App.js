import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext'

// Импорт компонентов:
import Main from './Main';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';

import * as auth from '../auth';
import * as api from '../utils/Api';

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
  const navigate = useNavigate();
 
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
  
  const [buttonTextConfirmPopup, setButtonTextConfirmPopup] = useState('Да');
  const [buttonTextSavePopup, setButtonTextSavePopup] = useState('Сохранить');
  
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [infoTooltip, setIsInfoTooltip] = useState({ isSuccessRegister: false, isOpen: false});

  // Смена state-ов:
  function closeAllPopups() {
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltip({ ...infoTooltip, isOpen: false });
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
  function infoTooltipSetter(isOpen, isSuccessRegister) {
    setIsInfoTooltip({ isSuccessRegister, isOpen });
  }

  // Функции и API-запросы регистрации, авторизации:
  useEffect(() => {
    auth.checkToken()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsSpinnerVisible(true);

    api.getCards()
      .then((cards) => {
        setCards(cards.reverse())
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsSpinnerVisible(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loggedIn])

  function onSignout() {
    setLoggedIn(false);
  }
  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => {
        navigate('/sign-in');
      })
      .then(() => {
        infoTooltipSetter(true, true);
      })
      .catch((err) => {
        infoTooltipSetter(true, false);
      })
  }
  function handleAuthorize(password, email) {
    auth.authorize(password, email)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  // API-запросы карточек и пользователя:
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(likeId => likeId === currentUser._id);

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

    api.updateProfile(userData)
      .then((refreshedUser) => {
        setCurrentUser(refreshedUser)
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

    api.createCard(cardData)
      .then((postedCard) => {
        setCards([postedCard, ...cards])
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

    api.updateAvatar(avatarInputValue)
      .then((updatedUser) => {
        setCurrentUser(updatedUser)
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={currentUser.email}
          loggedIn={loggedIn}
          onSignout={onSignout}
        />

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

          <Route path='*' element={<PageNotFound loggedIn={loggedIn} />} />

          <Route path='/sign-in' element={<Login handleAuthorize={handleAuthorize} />} />

          <Route path='/sign-up' element={<Register handleRegister={handleRegister} />} />
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
        onClose={closeAllPopups}
        isOpen={infoTooltip.isOpen}
        isSuccessRegister={infoTooltip.isSuccessRegister}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
