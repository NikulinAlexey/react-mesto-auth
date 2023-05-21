import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, setIsDeletePopupOpen, handleDelete }) {
  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = card.owner._id === currentUser._id; 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

  function handleClick() {
    onCardClick(card);
  } 
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleConfirmPopup() {
    handleDelete(card);
    setIsDeletePopupOpen(true);
  }

  return (
    <article className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
          <div className="element__like-count">{card.likes.length}</div>
        </div>
      </div>
      {isOwn && <button className="element__trash" onClick={handleConfirmPopup}></button>}
    </article>
  );
}

export default Card; 