import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(user[`user-name`] || '')
  const [description, setDescription] = React.useState(user[`user-profession`] || '');
  const [isChanged, setIsChanged] = React.useState({
    nameChanged: false,
    aboutChanged: false
  });

  React.useEffect(() => {
    if (user) {
      setName(user[`user-name`]);
      setDescription(user[`user-profession`]);
      setIsChanged(false);
    }
  },[user, props.isOpen])

  function handleNameInput(evt) {
    const name = evt.target.value;
    setName(name);
    setIsChanged({
      nameChanged: !(name === user['user-name']),
      aboutChanged: isChanged.aboutChanged,
    });
  }
  function handleDescriptionInput(evt) {
    const about = evt.target.value
    setDescription(about);
    setIsChanged({
      nameChanged: isChanged.nameChanged,
      aboutChanged: !(about === user[`user-profession`]),
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUserUpdate({
      [`user-name`]: name,
      [`user-profession`]: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      formName="user-info"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      isChanged={isChanged.nameChanged || isChanged.aboutChanged}
    >
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
    </PopupWithForm>
  )
}