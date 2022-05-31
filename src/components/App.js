import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: '',
    }
  }

  handleEditProfileClick = () => {
    this.setState({isEditProfilePopupOpen: true});
  }

  handleEditAvatarClick = () => {
    this.setState({isEditAvatarPopupOpen: true});
  }
  
  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
  }

  handleCardClick = (card) => {
    this.setState({selectedCard: card});
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
    })
  }

  render() {
  return (
    <>
      <Header />

      <Main 
        onEditProfile={this.handleEditProfileClick}
        onAddPlace={this.handleAddPlaceClick}
        onEditAvatar={this.handleEditAvatarClick}
        onCardClick={this.handleCardClick}
      />
      
      <Footer />

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}>
        <form className="pop-up__form" name="user-info" noValidate>
          <label className="pop-up__field">
            <input className="pop-up__input pop-up__input_field_name" name="user-name" type="text" id="user-name" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span className="pop-up__input-error user-name-error">!!!</span>
          </label>
          <label className="pop-up__field">
            <input className="pop-up__input pop-up__input_field_info" name="user-profession" type="text" id="user-profession" placeholder="Род деятельности" required minLength="2" maxLength="200"/>
            <span className="pop-up__input-error user-profession-error">!!!</span>
          </label>
          <button className="pop-up__submit-button" type="submit" disabled>Сохранить</button>
        </form>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
        <form className="pop-up__form" name="user-pic" noValidate>
          <label className="pop-up__field"> 
            <input className="pop-up__input pop-up__input_field_avatar-link" type="url" id="avatar" placeholder="Ссылка на аватар" required/>
            <span className="pop-up__input-error avatar-error">!!!</span>          
          </label>
          <button className="pop-up__submit-button" type="submit" disabled>Сохранить</button>
        </form>
      </PopupWithForm>

      <PopupWithForm name="place" title="Новое место" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
        <form className="pop-up__form" name="place-form" noValidate>
          <label className="pop-up__field">
            <input className="pop-up__input pop-up__input_field_place-name" type="text" id="name" placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="pop-up__input-error name-error">!!!</span>          
          </label>
          <label className="pop-up__field"> 
            <input className="pop-up__input pop-up__input_field_place-link" type="url" id="link" placeholder="Ссылка на картинку" required/>
            <span className="pop-up__input-error link-error">!!!</span>          
          </label>
          <button className="pop-up__submit-button" type="submit" disabled>Сохранить</button>
        </form>
      </PopupWithForm>

      <PopupWithForm name="confirm" title="Вы уверены?">
        <form className="pop-up__form" name="user-confirm" noValidate>
          <button className="pop-up__submit-button" type="submit" disabled>Да</button>
        </form>
      </PopupWithForm>

      <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
    </>)
  }
}
