function PopupWithForm({
  name,
  text,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  isFormValid
}) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        
        <button
          type="button"
          onClick={onClose}
          className="popup__close-icon"
        />
        <h2 className="popup__title"> {title} </h2>

        <form
          noValidate
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}}`}
        >
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