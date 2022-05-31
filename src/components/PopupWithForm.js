import EscapeListener from "./EscapeListener";

export default function PopupWithForm(props) {
  return (
    props.isOpen &&
      <div className={`pop-up pop-up_active pop-up_type_${props.name}`} onClick={props.onClose} >
        <div className="pop-up__container" onClick={evt => evt.stopPropagation()}>
          <h2 className="pop-up__title">{props.title}</h2>
          <span className="pop-up__network-error">!!!</span>
            {props.children}
          <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
        </div>
        <EscapeListener close={props.onClose} />
      </div>
  )
}
