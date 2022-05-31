import EscapeListener from "./EscapeListener";

function ImagePopup(props) {
  return (
    props.card &&
    <div className="pop-up pop-up_active pop-up_type_photo" onClick={props.onClose}>
      <div className="pop-up__figure" onClick={evt => evt.stopPropagation()}>
        <img className="pop-up__image" src={props.card.link} alt={props.card.name} />
        <h2 className="pop-up__image-caption">{props.card.name}</h2>
        <button className="pop-up__close-button" type="button" onClick={props.onClose} />
      </div>
      <EscapeListener close={props.onClose} />
    </div>
  )
}

export default ImagePopup;