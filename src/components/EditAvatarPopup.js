import { useEffect } from "react";
import useFormWithValidation from "../hooks/useValidationForm";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  textOfButton,
  onUpdateAvatar,
}) {

  const { values, handleChange, resetForm, isValid, errors } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar(`${values.avatar}`);
  }
  
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);
 
  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      text={textOfButton}
      isFormValid={isValid}
      onSubmit={handleSubmit}
      title="Обновить аватар"
    >
      
      <input
        required
        type="url"
        name="avatar"
        minLength="2"
        id="avatar-input"
        onChange={handleChange}
        value={values.avatar || ''}
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_avatar ${errors.avatar === undefined || errors.avatar === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="avatar-input-error" className="popup__error">{errors?.avatar}</span>

    </PopupWithForm>  
  )
}

export default EditAvatarPopup;