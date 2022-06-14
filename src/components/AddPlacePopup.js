import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('');
  const [isChanged, setIsChanged] = React.useState({
    nameChanged: false,
    linkChanged: false
  });

  function handleNameInput(evt) {
    const name = evt.target.value;
    setName(name);
    setIsChanged({
      nameChanged: !(name === ''),
      linkChanged: isChanged.linkChanged,
    });
  }

  function handleLinkInput(evt) {
    const link = evt.target.value;
    setLink(link);
    setIsChanged({
      nameChanged: isChanged.nameChanged,
      linkChanged: !(link === ''),
    });
  }

  return (
  <PopupWithForm 
    name="place"
    formName="place-form"
    title="Новое место"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={props.onSubmit}
    isChanged={isChanged.linkChanged && isChanged.nameChanged}
    buttonText="Сохранить"
  >
    <label className="pop-up__field">
      <input 
        className="pop-up__input pop-up__input_field_place-name"
        type="text" id="name" placeholder="Название"
        required minLength="2" maxLength="30"
        onChange={handleNameInput}
      />
      <span className="pop-up__input-error name-error">!!!</span>          
    </label>
    <label className="pop-up__field"> 
      <input 
        className="pop-up__input pop-up__input_field_place-link"
        type="url" id="link" placeholder="Ссылка на картинку"
        required
        onChange={handleLinkInput}
      />
      <span className="pop-up__input-error link-error">!!!</span>          
    </label>
  </PopupWithForm>
  )
}