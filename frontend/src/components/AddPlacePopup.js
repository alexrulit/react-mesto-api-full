import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();
      
        props.onAddPlace({
          name,
          link,
        });
      }

    return(
        <PopupWithForm name="addcard" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="popupName" name="name" type="text" value={name} onChange={handleChangeName} className="popup__input" placeholder="Название" minLength="1" maxLength="30" required />
            <span id="popupName-error" className="popup__input-error"></span>
            <input id="popupLink" name="link" type="url" value={link} onChange={handleChangeLink} className="popup__input" placeholder="Ссылка на картинку" required />
            <span id="popupLink-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;