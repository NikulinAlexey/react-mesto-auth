import { useState, useEffect } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

// Импорт компонентов:
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import api  from '../utils/Api';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';

function App() {
  // Стейт переменные:
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);

  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [buttonTextConfirmPopup, setButtonTextConfirmPopup] = useState('Да');
  const [buttonTextSavePopup, setButtonTextSavePopup] = useState('Сохранить');
  

  // Смена state попапов:
  function closeAllPopups() {
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
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
  
  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onAddPlace={handleAddPlaceClick}
          isSpinnerVisible={isSpinnerVisible}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardDeleteClick={handleDeleteCardClick}
          setIsDeletePopupOpen={setIsDeletePopupOpen}
        />
        <Footer />
      </div>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} textOfButton={buttonTextSavePopup} />
      
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} textOfButton={buttonTextSavePopup} />
      
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} textOfButton={buttonTextSavePopup} />
      
      <ConfirmPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} card={selectedCardToDelete} textOfButton={buttonTextConfirmPopup} />

    </CurrentUserContext.Provider>
  );
}

export default App;
