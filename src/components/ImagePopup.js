import React from 'react';

function ImagePopup({ card, onClose }) {  
  return (
    <div className={`popup image-popup image-popup_type_image ${card ? `popup_opened` : ``}`}>
      <div className="image-popup__container">
        <button className="image-popup__close-icon" type="button" onClick={onClose}></button>
        <img src={card?.link} alt={card?.name} className="image-popup__image" />
        <h2 className="image-popup__title">{card ? card.name : ""}</h2>
      </div>
    </div>
  );
}

export default ImagePopup; 