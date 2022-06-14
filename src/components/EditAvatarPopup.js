import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const [isChanged, setIsChanged] = React.useState(false);

  const inputRef = React.useRef();

  React.useEffect(() => {inputRef.current.value = ''},[props.isOpen])
  
  function handleAvatarInput() {
    const link = inputRef.current.value;
    setAvatar(link);
    setIsChanged(!(link === ''));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAvatarUpdate(avatar);
  }

  return (
    <PopupWithForm
          name="avatar"
          formName="user-pic"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          isChanged={isChanged}
          >
            <label className="pop-up__field"> 
              <input ref={inputRef} onChange={handleAvatarInput} className="pop-up__input pop-up__input_field_avatar-link" type="url" id="avatar" placeholder="Ссылка на аватар" required/>
              <span className="pop-up__input-error avatar-error">!!!</span>          
            </label>
        </PopupWithForm>
  )
}