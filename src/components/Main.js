import {  useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';
import Spinner from './Spinner';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, setIsDeletePopupOpen, cards, onCardDeleteClick, isSpinnerVisible }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-mask" onClick={onEditAvatar}></div>
          <img src={currentUser.avatar} alt="Аватар анкеты" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <Spinner isSpinnerVisible={isSpinnerVisible} />
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} handleDelete={onCardDeleteClick} setIsDeletePopupOpen={setIsDeletePopupOpen}/>
          ))}
      </section>
    </main>
  );
}

export default Main; 