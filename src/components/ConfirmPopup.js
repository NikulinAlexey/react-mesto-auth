import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDelete, card, textOfButton }) {
  const isFormValid = true;
  
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }
  return (
    <PopupWithForm name="delete" title="Вы уверены?" onClose={onClose} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isFormValid} />
  )
}

export default ConfirmPopup;