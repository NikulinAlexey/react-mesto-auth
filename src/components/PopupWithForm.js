function PopupWithForm({ name, onClose, isOpen, title, children, text, onSubmit, isFormValid }) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={onClose}></button>
        <h2 className="popup__title">
          {title}
        </h2>
        <form className={`popup__form popup__form_type_${name}}`} noValidate onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`popup__submit popup__submit_type_${name} ${!isFormValid ? 'popup__submit_type_inactive' : ''}`}
          >
            {text}
          </button>
        </form>

      </div>
    </div>
  );
}

export default PopupWithForm; 