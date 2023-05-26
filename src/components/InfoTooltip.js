import errorImage from '../images/errorRegister-image.png';
import successImage from '../images/successRegister-image.png';

function InfoTooltip({
  isOpen,
  onClose,
  isSuccessRegister
}) {

  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        
        <button
          type="button"
          onClick={onClose}
          className="popup__close-icon"
        />
        <img
          className="popup__image"
          src={isSuccessRegister ? successImage : errorImage}
          alt={isSuccessRegister ? "Картинка успешной регистрации" : "Картинка ошибки при регистрации"}
        />
        <h2 className="popup__title popup__title_type_info">
          {isSuccessRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} 
        </h2>

      </div>
    </div>
  );
}

export default InfoTooltip; 