export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="photo-grid__card">
      <img className="photo-grid__photo" src={props.card.link} alt="" onClick={handleClick} />
      <button className="photo-grid__remove-button" type="button"></button>
      <div className="photo-grid__caption">
        <h2 className="photo-grid__textbox">{props.card.name}</h2>
        <div className="photo-grid__likewrapper">
          <button className="photo-grid__like-button" type="button"></button>
          <p className="photo-grid__likes">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
