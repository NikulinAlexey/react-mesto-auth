import { useEffect } from "react";
import useFormWithValidation from "../hooks/useValidationForm";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  textOfButton
}) {
  
  const { values, handleChange, resetForm, isValid, errors } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: values.link,
      place: values.place
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      text={textOfButton}
      isFormValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        name="place"
        minLength="2"
        id="place-input"
        placeholder="Название"
        onChange={handleChange}
        value={values.place || ''}
        className={`popup__input popup__input_type_place ${errors.place === undefined || errors.place === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="place-input-error" className="popup__error">{errors?.place}</span>
      
      <input
        required
        type="url"
        name="link"
        minLength="2"
        id="link-input"
        onChange={handleChange}
        value={values.link || ''}
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_link ${errors.link === undefined || errors.link === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="link-input-error" className="popup__error">{errors?.link}</span>

    </PopupWithForm>
  )
}

export default AddPlacePopup;