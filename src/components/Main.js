import React from 'react';
import userpic from '../images/userpic.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


export default class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Жак-Ив Кусто',
      userDescription : 'Исследователь океана',
      userAvatar: userpic,
      cards: this.props.cards,
    }
  }
  

  //so the card array only renderd when user is defined
  componentDidUpdate() {
    if (this.state.cards.length === 0) this.setState({cards: this.props.cards})
  }

  render() { 
    return (
    <main>
      <section className="profile">
        <button className="profile__img-button" type="button">
          <img className="profile__avatar" src={this.context[`user-pic`]} alt="Аватар" />
          <div className="profile__overlay" onClick={this.props.onEditAvatar}></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{this.context[`user-name`]}</h1>
          <button className="profile__eddit-button" type="button" onClick={this.props.onEditProfile}></button>
          <p className="profile__description">{this.context[`user-profession`]}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
      </section>

      <section className="photo-grid">
      {
        this.state.cards.map((card, i) => (
          <Card card={card} key={card._id} onCardClick={this.props.onCardClick} />
        ))
      }
      </section>
    </main>
  )}
}
