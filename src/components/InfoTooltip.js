import errorImage from '../images/errorRegister-image.png';
import successImage from '../images/successRegister-image.png';

function InfoTooltip({ onClose, isOpen, loggedIn }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={onClose}></button>
        <img
          className="popup__image"
          src={loggedIn ? successImage : errorImage}
          alt={loggedIn ? "Картинка успешной регистрации" : "Картинка ошибки при регистрации"}
        />
        <h2 className="popup__title popup__title_type_info">
          {loggedIn ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} 
        </h2>

      </div>
    </div>
  );
}

export default InfoTooltip; 