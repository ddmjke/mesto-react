import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import mestoApi from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isImagePopupOpen: false,
      selectedCard: null,
      currentUser: null,
      cards: [],
    }
  }

  componentDidMount() {
    mestoApi.getUser()
      .then(user => {
        this.setState({currentUser: user})
      })
      .catch(err => console.log(`Failed to load initial user : ${err}`));
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
    this.setState({
      isImagePopupOpen: true,
      selectedCard: card
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isImagePopupOpen: false,
      selectedCard: null,
    })
  }

  handleUserUpdate = (user) => {
    mestoApi.setUser(user)
      .then(res => {
        this.setState({currentUser: {
          'user-name': res.name,
          'user-profession': res.about,
          'user-pic': res.avatar,
          id: res._id,
        }})
        this.closeAllPopups();
      })
      .catch(err => console.log(`Failed to update user info : ${err}`));
  }

  handleAvatarUpdate = (link) => {
    mestoApi.setAvatar({avatar: link})
      .then(res => {
        const newUser = this.state.currentUser;
        newUser[`user-pic`] = res.avatar;
        this.setState(newUser)
        this.closeAllPopups();
      })
      .catch(err => console.log(`Failed to update avatar : ${err}`));
  }

  render() {
  return (
    <>
      <CurrentUserContext.Provider value={this.state.currentUser || ''}>

        <Header />

        <Main 
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
          cards={this.state.cards}
        />
        
        <Footer />

        <EditProfilePopup
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
          onUserUpdate={this.handleUserUpdate}
        />

        <EditAvatarPopup
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onAvatarUpdate={this.handleAvatarUpdate}  
        />

        <PopupWithForm 
          name="place"
          formName="place-form"
          title="Новое место"
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onUserUpdate={this.handleUserUpdate}
          buttonText="Сохранить"
          >
            <label className="pop-up__field">
              <input className="pop-up__input pop-up__input_field_place-name" type="text" id="name" placeholder="Название" required minLength="2" maxLength="30"/>
              <span className="pop-up__input-error name-error">!!!</span>          
            </label>
            <label className="pop-up__field"> 
              <input className="pop-up__input pop-up__input_field_place-link" type="url" id="link" placeholder="Ссылка на картинку" required/>
              <span className="pop-up__input-error link-error">!!!</span>          
            </label>
        </PopupWithForm>

        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" formName="user-confirm">
        </PopupWithForm>

        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} isOpen={this.state.isImagePopupOpen}/>
      </CurrentUserContext.Provider>
    </>)
  }
}
