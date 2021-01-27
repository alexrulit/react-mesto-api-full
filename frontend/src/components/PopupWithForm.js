import React from 'react';

function PopupWithForm(props) {
    return(    
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form name={props.name} onSubmit={props.onSubmit} action="#" className="popup__container" noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__submit">Сохранить</button>
        <button type="button" className="popup__close" onClick={props.onClose} />
      </form>
    </div>
    );
}

export default PopupWithForm;