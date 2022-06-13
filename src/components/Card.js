import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const user = React.useContext(CurrentUserContext);
  function handleClick() {
    props.onCardClick(props.card);
  }
  
  const isOwn = user.id === props.card.owner._id;
  const isLiked = props.card.likes.some(like => like._id === user.id);

  return (
    <div className="photo-grid__card">
      <img className="photo-grid__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button className={`photo-grid__remove-button ${isOwn && 'photo-grid__remove-button_visible'}`} type="button"></button>
      <div className="photo-grid__caption">
        <h2 className="photo-grid__textbox">{props.card.name}</h2>
        <div className="photo-grid__likewrapper">
          <button className={`photo-grid__like-button ${isLiked && `photo-grid__like-button_active`}`} type="button"></button>
          <p className="photo-grid__likes">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
