import EscapeListener from "./EscapeListener";

export default function PopupWithForm(props) {
  return (
      <div className={`pop-up ${props.isOpen ? 'pop-up_active' : ''} pop-up_type_${props.name}`} onClick={props.onClose} >
        <div className="pop-up__container" onClick={evt => evt.stopPropagation()}>
          <h2 className="pop-up__title">{props.title}</h2>
          <span className="pop-up__network-error">!!!</span>
            <form className="pop-up__form" name={props.formName} noValidate onSubmit={props.onSubmit}>
              {props.children}
              <button className={`pop-up__submit-button ${!props.isChanged ? 'pop-up__submit-button_inactive' : ''}`} disabled={!props.isChanged} type="submit" >{props.buttonText}</button>  
            </form>
          <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
        </div>
        <EscapeListener close={props.onClose} />
      </div>
  )
}
