import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';
import Spinner from './Spinner';

function Main({
  cards,
  onCardLike,
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  isSpinnerVisible,
  onCardDeleteClick,
  setIsDeletePopupOpen
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-mask" onClick={onEditAvatar}/>
          <img
            alt="Аватар анкеты"
            src={currentUser.avatar}
            className="profile__avatar"
          />
        </div>

        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__name"> {currentUser.name} </h1>
            <button
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
              className="profile__edit-button"
            />
          </div>
          <p className="profile__job"> {currentUser.about} </p>
        </div>

        <button
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить"
          className="profile__add-button"
        />
      </section>

      <section className="elements">
        <Spinner isSpinnerVisible={isSpinnerVisible} />

        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            handleDelete={onCardDeleteClick}
            setIsDeletePopupOpen={setIsDeletePopupOpen}
          />
        ))}
      </section>
    </main>
  );
}

export default Main; 