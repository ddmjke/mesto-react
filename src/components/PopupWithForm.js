

function PopupWithForm(props) {
  return (
    props.isOpen &&
      <div className={`pop-up pop-up_active pop-up_type_${props.name}`}>
        <div className="pop-up__container">
          <h2 className="pop-up__title">{props.title}</h2>
          <span className="pop-up__network-error">!!!</span>
            {props.children}
          <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
        </div>
      </div>
  );
}

export default PopupWithForm;