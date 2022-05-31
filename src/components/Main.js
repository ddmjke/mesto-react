import userpic from '../images/userpic.jpg';

function Main(props) {
  return (
    <main>
      <section className="profile">
        <button className="profile__img-button" type="button">
          <img className="profile__avatar" src={userpic} alt="Аватар" />
          <div className="profile__overlay" onClick={props.onEditAvatar}></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <button className="profile__eddit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__description">Исследователь океана</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="photo-grid">
      </section>
    </main>
  )
}

export default Main;