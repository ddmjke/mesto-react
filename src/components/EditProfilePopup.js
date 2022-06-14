import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(user[`user-name`])
  const [description, setDescription] = React.useState(user[`user-profession`]);
  function handleNameInput(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionInput(evt) {
    setDescription(evt.target.value);
  }
  return (
    <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonText="Сохранить"
          >
          <form className="pop-up__form" name="user-info" noValidate>
            <label className="pop-up__field">
              <input 
                className="pop-up__input pop-up__input_field_name"
                name="user-name"
                type="text"
                id="user-name"
                placeholder="Имя"
                required minLength="2" maxLength="40"
                value={name}
                onChange={handleNameInput}/>
              <span className="pop-up__input-error user-name-error">!!!</span>
            </label>
            <label className="pop-up__field">
              <input 
                className="pop-up__input pop-up__input_field_info"
                name="user-profession"
                type="text"
                id="user-profession"
                placeholder="Род деятельности"
                required minLength="2" maxLength="200"
                value={description}
                onChange={handleDescriptionInput}
              />
              <span className="pop-up__input-error user-profession-error">!!!</span>
            </label>
          </form>
        </PopupWithForm>
  )
}