import React from 'react';
import userpic from '../images/userpic.jpg';
import mestoApi from '../utils/Api';
import Card from './Card';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Жак-Ив Кусто',
      userDescription : 'Исследователь океана',
      userAvatar: userpic,
      cards: [],
    }
  }

  componentDidMount() {
    Promise.all([mestoApi.getUser(), mestoApi.getCards()])
      .then(([info, cards]) => {
        this.setState({
          userName: info['user-name'],
          userDescription : info['user-profession'],
          userAvatar: info['user-pic'],
          cards: cards,
        })
      })
      .catch(err => console.log(`Failed to load initial info : ${err}`));
  }

  render() { 
    return (
    <main>
      <section className="profile">
        <button className="profile__img-button" type="button">
          <img className="profile__avatar" src={this.state.userAvatar} alt="Аватар" />
          <div className="profile__overlay" onClick={this.props.onEditAvatar}></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{this.state.userName}</h1>
          <button className="profile__eddit-button" type="button" onClick={this.props.onEditProfile}></button>
          <p className="profile__description">{this.state.userDescription}</p>
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
