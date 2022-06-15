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
import AddPlacePopup from './AddPlacePopup';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isImagePopupOpen: false,
      isDeletePopupOpen: false,
      cardToDelete: null,
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
    
    mestoApi.getCards()
    .then (cards => {
      this.setState({cards: cards});
    })
    .catch(err => console.log(`Failed to load initial cards : ${err}`));
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

  handleLikeClick = (card) => {
    const isLiked = card.likes.some(like => like._id === this.state.currentUser.id);
    mestoApi.toggleLike(card._id, isLiked)
      .then (res =>{
        const newCards = this.state.cards.map(card => {return card._id === res._id ? res: card});
        this.setState({cards: newCards});
      })
      .catch(err => console.log(`Failed to change like status : ${err}`))
  }

  handleDeleteClick = (card) => {
    this.closeAllPopups();
    this.setState({
      isDeletePopupOpen: true,
      cardToDelete: card,
    });
  }

  handleDeleteSubmit = (evt) => {
    evt.preventDefault();
    this.closeAllPopups();
    mestoApi.deleteCard(this.state.cardToDelete._id)
      .then(() => {
        this.setState({
          cards: this.state.cards.filter(card => card._id !== this.state.cardToDelete._id),
        });
      })
      .catch(e => console.log(e))
      .finally(() => {
        this.setState({cardToDelete: null})
      })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isImagePopupOpen: false,
      isDeletePopupOpen: false,
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

  handleAddPlaceSubmit = (args) => {
    mestoApi.setCard(args)
      .then(card => {
        this.setState([...this.state.cards, card]);
      })
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
          onCardLike={this.handleLikeClick}
          onCardDelete={this.handleDeleteClick}
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

        <AddPlacePopup 
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onSubmit={this.handleAddPlaceSubmit}
        />

        <PopupWithForm 
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          formName="user-confirm"
          isOpen={this.state.isDeletePopupOpen}
          onClose={this.closeAllPopups}
          onSubmit={this.handleDeleteSubmit}
          isChanged={true}
        >
        </PopupWithForm>

        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} isOpen={this.state.isImagePopupOpen}/>
      </CurrentUserContext.Provider>
    </>)
  }
}
