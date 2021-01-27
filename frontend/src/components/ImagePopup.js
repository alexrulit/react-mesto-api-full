import React from 'react';

function ImagePopup(props) {
    return(
    <div className={`popup popup_type_image ${props.card.hasOwnProperty('name') && 'popup_opened'}`}>
      <figure className="popup__figure">
        <img src={props.card.link} className="popup__img" alt={props.card.name} />
        <figcaption className="popup__figcaption">{props.card.name}</figcaption>
        <button type="button" className="popup__close" onClick={props.onClose}/>
      </figure>
    </div>
    );
}

export default ImagePopup;